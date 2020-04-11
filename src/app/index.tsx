import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'
import { Observer, isEmailValid } from './utils'

interface Item {
  $el: HTMLElement
  [key: string]: any
}

interface InputElementTarget extends EventTarget {
  value: string
}

interface InputEvent extends KeyboardEvent {
  target: InputElementTarget
}

class EmailsInput {
  static EMAIL_ADDED_EVENT = 'EMAIL_ADDED_EVENT'
  static EMAIL_REMOVED_EVENT = 'EMAIL_REMOVED_EVENT'
  static EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS'

  rootEl!: HTMLElement
  refs: any
  items!: Map<string, Item>
  $bus!: Observer

  constructor (rootEl: HTMLElement) {
    if (!(this instanceof EmailsInput)) {
      return new EmailsInput(rootEl)
    }

    this.rootEl = rootEl
    this.refs = {}
    this.items = new Map()
    this.$bus = new Observer()
    this.render()
    this.focusInput()
  }

  private render (): void {
    const $container = Core.render(
      <main ref="board" className='board'>
        {/* EMAILS WILL BE INSERTED HERE */ }
        <input
          ref="input"
          type='text'
          className='input'
          placeholder='add more people…'
          onblur={ (event: InputEvent) => { this.blurEventHandler(event) } }
          onkeydown={ (event: InputEvent) => { this.keyDownEventHandler(event) } }
          oninput={ (event: InputEvent) => { this.changeEventHandler(event) } }
        />
      </main>,
      this
    )

    this.rootEl.append($container)
  }

  public on (event: string, callback: Function): void {
    this.$bus.on(event, callback)
  }

  // TODO: Split on several functions
  public addEmail (value: string): void {
    const trimmedEmail = value.trim()
    const isEmpty = (trimmedEmail === '')
    if (isEmpty) {
      this.cleanInput()
      return
    }

    const isUnique = (!this.items.has(trimmedEmail))
    if (!isUnique) {
      this.$bus.emit(EmailsInput.EMAIL_ALREADY_EXISTS, value)
      return
    }

    const emails = value.split(',')
    if (emails.length > 1) {
      emails.forEach(email => {
        this.addEmail(email)
      })
      return
    }

    const email = this.prepareEmail(trimmedEmail)
    this.insertEmail(email)

    this.cleanInput()
    this.focusInput()
  }

  private prepareEmail (value: string): Item {
    const isValid = isEmailValid(value)
    const classValidOrNot = (isValid)
      ? 'email_valid'
      : 'email_invalid'

    const $email = Core.render(
      <div className={ `email ${classValidOrNot}` }>
        <div className='email__wrapper'>
          <span className='email__text'>{ value }</span>
          <button className='email__close'
            onclick={ () => { this.delEmail(value) } }
          ></button>
        </div>
      </div>
    )

    const result = {
      $el: $email,
      value: value,
      isValid: isValid
    }

    return result
  }

  private insertEmail (email: Item): void {
    const { board, input } = this.refs
    const { value, $el: $email } = email

    board.insertBefore($email, input)
    this.items.set(value, email)

    this.$bus.emit(EmailsInput.EMAIL_ADDED_EVENT, value)
  }

  public delEmail (id: string): void {
    const { items } = this
    const email = items.get(id)
    if (email != null) {
      const $parent = email.$el.parentNode
      $parent?.removeChild(email.$el)
      items.delete(id)

      this.$bus.emit(EmailsInput.EMAIL_REMOVED_EVENT, id)
    }
  }

  private blurEventHandler (event: InputEvent): void {
    this.addEmail(event.target.value)
  }

  private keyDownEventHandler (event: InputEvent): void {
    const COMMA = 188
    const COMMA_RU = 191
    const ENTER = 13

    if ([COMMA, COMMA_RU, ENTER].includes(event.keyCode)) {
      event.preventDefault()

      const value = event.target.value
      this.addEmail(value)
    }
  }

  private changeEventHandler (event: InputEvent): void {
    if (/,/g.test(event.target.value)) {
      this.addEmail(event.target.value)
    }
  }

  private focusInput (): void {
    this.refs.input.focus()
  }

  private cleanInput (): void {
    this.refs.input.value = ''
  }
}

export {
  EmailsInput
}
