// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '.'

describe('Core test', () => {
  it('Test TSX', () => {
    const textToContain = 'Hello'

    const expected = {
      tag: 'div',
      props: null,
      child: [textToContain]
    }

    const actual = <div>{ textToContain }</div>

    expect(actual).toStrictEqual(expected)
  })
})
