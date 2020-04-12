import { Observer } from '../utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '../core'
import * as Core from '../core'
import { Email, EmailItem } from './Email'

class EmailsInput {
  static EMAIL_ADDED_EVENT = 'EMAIL_ADDED_EVENT'
  static EMAIL_REMOVED_EVENT = 'EMAIL_REMOVED_EVENT'
  static EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS'

  private readonly config!: EmailsInputConfig
  private readonly rootEl!: HTMLElement
  private readonly refs: any
  private readonly items!: Map<string, EmailItem>
  private readonly $bus!: Observer

  constructor (rootEl: HTMLElement, options?: any) {
    if (!(this instanceof EmailsInput)) {
      return new EmailsInput(rootEl, options)
    }

    this.config = Object.assign({
      emails: []
    }, options)

    this.rootEl = rootEl
    this.refs = {}
    this.items = new Map()
    this.$bus = new Observer()

    this.render()
    this.focusInput()
  }

  private render (): void {
    const $container = Core.render(
      <main ref='board' className='board'>
        {/* EMAILS WILL BE INSERTED HERE */}
        <input
          ref='input'
          type='text'
          className='input'
          placeholder='add more people…'
          onblur={(event: InputEvent) => {
            this.blurEventHandler(event)
          }}
          onkeydown={(event: InputEvent) => {
            this.keyDownEventHandler(event)
          }}
          oninput={(event: InputEvent) => {
            this.changeEventHandler(event)
          }}
        />
      </main>,
      this
    )

    this.rootEl.append($container)

    this.config.emails.forEach((email) => {
      this.addEmail(email)
    })
  }

  public addEmail (value: string): void {
    const trimmedValue = value.trim()
    const isEmpty = (trimmedValue === '')
    if (isEmpty) {
      this.cleanInput()
      return
    }

    const isUnique = (!this.items.has(trimmedValue))
    if (!isUnique) {
      this.$bus.emit(EmailsInput.EMAIL_ALREADY_EXISTS, value)
      return
    }

    const email = new Email({
      onRemoveClick: this.delEmail.bind(this)
    }).createByValue(value)

    if (email != null) {
      this.insertEmail(email)

      this.cleanInput()
      this.focusInput()
    }
  }

  private insertEmail (email: EmailItem): void {
    const { board, input } = this.refs
    const { id, value, $el: $email } = email

    board.insertBefore($email, input)
    this.items.set(id, email)

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

  public on (event: string, callback: Function): void {
    this.$bus.on(event, callback)
  }

  public getAllItems (): any {
    return [...this.items.values()]
  }

  public replaceAllItems (emails: string[]): void {
    this.removeAllItems()
    if (Array.isArray(emails)) {
      emails.forEach((email) => {
        this.addEmail(email)
      })
    }
  }

  private removeAllItems (): void {
    this.items.forEach((_value: EmailItem, key: string) => {
      this.delEmail(key)
    })
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

interface EmailsInputConfig {
  emails: string[]
}

export {
  EmailsInput
}
