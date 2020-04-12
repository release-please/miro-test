import { isEmailValid } from '../utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '../core'
import * as Core from '../core'

interface EmailItem {
  id: string
  $el: HTMLElement
  value: string
  isValid: boolean
}

class Email {
  private readonly config: {
    value: string
    onRemoveClick: Function
  }

  constructor (options?: any) {
    this.config = Object.assign(
      {
        value: '',
        onRemoveClick () {
          throw new Error('`onRemoveClick` handler was not passed in constructor options.')
        },
      },
      options
    )
  }

  public createByValue (value: string): EmailItem | void {
    const emails = value.split(',')
    if (emails.length > 1) {
      emails.forEach((email) => {
        this.createByValue(email)
      })
      return
    }

    return this.prepareEmail(value)
  }

  private prepareEmail (value: string): EmailItem {
    const isValid = isEmailValid(value)
    const classValidOrNot = isValid
      ? 'email_valid'
      : 'email_invalid'

    const $email = Core.render(
      <div className={`email ${classValidOrNot}`}>
        <div className='email__wrapper'>
          <span className='email__text'>{value}</span>
          <button
            className='email__close'
            onclick={() => {
              this.config.onRemoveClick(value)
            }}></button>
        </div>
      </div>
    )

    const result = {
      id: value,
      $el: $email,
      value: value,
      isValid: isValid,
    }

    return result
  }
}

export {
  Email,
  EmailItem
}
