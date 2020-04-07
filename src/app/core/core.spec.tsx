// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '.'

// GivenWhenThen
// HACK: Я тут что-то напрогал для лучшего чтения тестов.
// Пока что это работает.
let ctx = {}
function given (labelOrFn: string | Function, fn?: Function): void {
  if (typeof labelOrFn === 'string') {
    fn?.(ctx)
  } else {
    labelOrFn(ctx)
  }
}
function when (labelOrFn: string | Function, fn?: Function): void {
  if (typeof labelOrFn === 'string') {
    fn?.(ctx)
  } else {
    labelOrFn(ctx)
  }
}
function then (labelOrFn: string | Function, fn?: Function): void {
  if (typeof labelOrFn === 'string') {
    fn?.(ctx)
  } else {
    labelOrFn(ctx)
  }
}
function clean (): void {
  ctx = {}
}

describe('Test `h` - function', () => {
  beforeEach(() => {
    clean()
  })

  it('Should return vnode with `ref` attribute', () => {
    let actualVNode: any | vNode
    let refName: any | string
    let expectedVNode: any | vNode

    given(() => {
      refName = 'test-ref'

      expectedVNode = {
        tag: 'div',
        props: {
          ref: refName,
        },
        child: [],
      }
    })

    when(() => {
      actualVNode = <div ref={refName}></div>
    })

    then(() => {
      expect(actualVNode).toStrictEqual(expectedVNode)
    })
  })

  it('Should return vnode with empty `attr`', () => {
    let actualVNode: any | vNode
    let expectedVNode: any | vNode

    given(() => {
      expectedVNode = {
        tag: 'div',
        props: null,
        child: []
      }
    })

    when(() => {
      actualVNode = <div></div>
    })

    then(() => {
      expect(actualVNode).toStrictEqual(expectedVNode)
    })
  })

  it('Should return vnode with child', () => {
    let actualVNode: any | vNode
    let expectedVNode: any | vNode

    given(() => {
      expectedVNode = {
        tag: 'div',
        props: null,
        child: [
          {
            tag: 'h1',
            props: null,
            child: []
          }
        ]
      }
    })

    when(() => {
      actualVNode = (
        <div>
          <h1></h1>
        </div>
      )
    })

    then(() => {
      expect(actualVNode).toStrictEqual(expectedVNode)
    })
  })
})
