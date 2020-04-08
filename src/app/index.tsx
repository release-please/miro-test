import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'

document.body.onload = () => {
  const $app = Core.render(
    <div className='container'>
      <div className='board'>
        <div className='board__body'>
          <h1 className='board__title'>
            Shared <span className='board__title board__title_bold'>Board name</span> with others
          </h1>
          <main className='board__space'>
            <div className='label label_valid'>
              <div className='label__wrapper'>
                <span className='label__text'>john@miro.com</span>
                <button className='label__close'></button>
              </div>
            </div>
            <div className='label label_invalid'>
              <div className='label__wrapper'>
                <span className='label__text'>invalid.email</span>
                <button className='label__close'></button>
              </div>
            </div>
            <div className='label label_valid'>
              <div className='label__wrapper'>
                <span className='label__text'>mike@miro.com</span>
                <button className='label__close'></button>
              </div>
            </div>
            <div className='label label_valid'>
              <div className='label__wrapper'>
                <span className='label__text'>alexander@miro.com</span>
                <button className='label__close'></button>
              </div>
            </div>
            <div className='label label_valid'>
              <div className='label__wrapper'>
                <span className='label__text'>
                  long non-breaking text long non-breaking text long non-breaking text
                </span>
                <button className='label__close'></button>
              </div>
            </div>
            {/* HACK: Implement auto width */}
            <input
              type='text'
              onkeydown="this.style.width = ((this.value.length + 1) * 8) + 'px';"
              className='input'
              placeholder='add more people…'
            />
          </main>
        </div>
        <div className='board__footer'>
          <button className='btn btn_primary'>Add email</button>
          <button className='btn btn_primary'>Get emails count</button>
        </div>
      </div>
    </div>
  )

  document.body.append($app)
}
