import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'

document.body.onload = () => {
  const $app = Core.render(
    <div className='container'>
      <div className='form'>
        <div className='form__body'>
          <h1 className='form__title'>
            Shared <span className='form__title form__title_bold'>Board name</span> with others
          </h1>
          <main className='board'>
            <div className='email email_valid'>
              <div className='email__wrapper'>
                <span className='email__text'>john@miro.com</span>
                <button className='email__close'></button>
              </div>
            </div>
            <div className='email email_invalid'>
              <div className='email__wrapper'>
                <span className='email__text'>invalid.email</span>
                <button className='email__close'></button>
              </div>
            </div>
            <div className='email email_valid'>
              <div className='email__wrapper'>
                <span className='email__text'>mike@miro.com</span>
                <button className='email__close'></button>
              </div>
            </div>
            <div className='email email_valid'>
              <div className='email__wrapper'>
                <span className='email__text'>alexander@miro.com</span>
                <button className='email__close'></button>
              </div>
            </div>
            <div className='email email_valid'>
              <div className='email__wrapper'>
                <span className='email__text'>
                  long non-breaking text long non-breaking text long non-breaking text
                </span>
                <button className='email__close'></button>
              </div>
            </div>
            <input
              type='text'
              className='input'
              placeholder='add more people…'
            />
          </main>
        </div>
        <div className='form__footer'>
          <button className='btn btn_primary'>Add email</button>
          <button className='btn btn_primary'>Get emails count</button>
        </div>
      </div>
    </div>
  )

  document.body.append($app)
}
