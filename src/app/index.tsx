import '../styles/styles.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from './core'
import * as Core from './core'

document.body.onload = () => {
  const $app = Core.render(
    <div>
      <button onclick={ () => { console.log('click') } }>
        click
      </button>
    </div>
  )

  document.body.append($app)
}
