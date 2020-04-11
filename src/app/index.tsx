import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'
import { Observer, isEmailValid } from './utils'

interface AppItem {
  id: string
  $el: HTMLElement
  [key: string]: any
}

class API {
  refs: any = {}
  items: Map<string, AppItem> = new Map()
  $bus: Observer = new Observer()

  constructor (private readonly rootEl: HTMLElement) {
    this.rootEl = rootEl
    this.render()
    this.inputFocus()
  }

  public addEmail (email: string): void {
    if (typeof email !== 'string') return

    const trimmedEmail = email.trim()

    const isEmpty = (trimmedEmail === '')
    if (isEmpty) {
      this.cleanInput()
      return
    }

    const ID = `EMAIL_${Math.random()}`
    const isValid = isEmailValid(trimmedEmail)
    const classValidOrNot = (isValid)
      ? 'email_valid'
      : 'email_invalid'

    const $email = Core.render(
      <div className={ `email ${classValidOrNot}` }>
        <div className='email__wrapper'>
          <span className='email__text'>{ trimmedEmail }</span>
          <button className='email__close'
            onclick={ () => { this.delEmail(ID) } }
          ></button>
        </div>
      </div>
    )

    const { board, input } = this.refs
    board.insertBefore($email, input)

    this.cleanInput()

    const result = {
      id: ID,
      $el: $email,
      value: trimmedEmail,
      valid: isEmailValid(trimmedEmail)
    }

    this.items.set(ID, result)

    this.inputFocus()
  }

  private cleanInput (): void {
    this.refs.input.value = ''
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

  private keyDownHandler (event: any): void {
    const COMMA = 188
    const COMMA_RU = 191
    const ENTER = 13

    if ([COMMA, COMMA_RU, ENTER].includes(event.keyCode)) {
      event.preventDefault()
      const value = event.target.value
      this.addEmail(value)
    }
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
              {/* EMAILS */}
              <input
                ref="input"
                type='text'
                className='input'
                placeholder='add more people…'
                onblur={ (event: any) => { this.addEmail(event?.target?.value) } }
                onkeydown={ () => { this.keyDownHandler(event) }}
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

    this.items.set('api', {
      id: 'api',
      $el: $container,
      instance: this
    })

    this.rootEl.append($container)
  }

  private inputFocus (): void {
    this.refs.input.focus()
  }
}

export {
  API
}
