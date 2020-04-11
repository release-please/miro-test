import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'
import { Observer, isEmailValid } from './utils'

interface Item {
  id: string
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
      <div className='container'>
        <div className='form'>
          <div className='form__body'>
            <h1 className='form__title'>
              Shared <span className='form__title form__title_bold'>Board name</span> with others
            </h1>
            <main ref="board" className='board'>
              {/* EMAILS WILL BE INSERTED HERE */ }
              <input
                ref="input"
                type='text'
                className='input'
                placeholder='add more people…'
                onblur={ (event: InputEvent) => { this.blurEventHandler(event) } }
                onkeydown={ (event: InputEvent) => { this.keyDownEventHandler(event) } }
              />
            </main>
          </div>
          <div className='form__footer'>
            <button className='btn btn_primary'>Add email</button>
            <button className='btn btn_primary'>Get emails count</button>
          </div>
        </div>
      </div>,
      this
    )

    this.rootEl.append($container)
  }

  public addEmail (value: string): void {
    const trimmedEmail = value.trim()
    const isEmpty = (trimmedEmail === '')
    if (isEmpty) {
      this.cleanInput()
      return
    }

    const email = this.prepareEmail(trimmedEmail)
    this.insertEmail(email)

    this.cleanInput()
    this.focusInput()
  }

  private prepareEmail (value: string): Item {
    const ID = `EMAIL_${Math.random()}`
    const isValid = isEmailValid(value)
    const classValidOrNot = (isValid)
      ? 'email_valid'
      : 'email_invalid'

    const $email = Core.render(
      <div className={ `email ${classValidOrNot}` }>
        <div className='email__wrapper'>
          <span className='email__text'>{ value }</span>
          <button className='email__close'
            onclick={ () => { this.delEmail(ID) } }
          ></button>
        </div>
      </div>
    )

    const result = {
      id: ID,
      $el: $email,
      value: value,
      isValid: isValid
    }

    return result
  }

  private insertEmail (email: Item): void {
    const { board, input } = this.refs
    const { id, $el: $email } = email

    board.insertBefore($email, input)
    this.items.set(id, email)
  }

  private delEmail (id: string): void {
    const { items } = this
    const email = items.get(id)
    if (email != null) {
      const $parent = email.$el.parentNode
      $parent?.removeChild(email.$el)
      items.delete(id)
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
