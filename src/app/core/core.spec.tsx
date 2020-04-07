// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '.'
import * as Core from '.'

// GivenWhenThen
// HACK: Я тут что-то напрогал для лучшего чтения тестов.
// Пока что это работает.
const ctx = {}
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

describe('Core test', () => {
  it.todo('Refactor: DRY')
  it.todo('Research: Given When Then - pattern')
  it.todo('Research: `Core.render()` prop handlers. Patterns, loop, if-else alternative. See TODO')

  describe('`h` - function', () => {
    it('Should return vnode with `ref` attribute', () => {
      let actualVNode: vNode
      let refName: string
      let expectedVNode: vNode

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
      let actualVNode: vNode
      let expectedVNode: vNode

      given(() => {
        expectedVNode = {
          tag: 'div',
          props: null,
          child: [],
        }
      })

      when(() => {
        actualVNode = <div></div>
      })

      then(() => {
        expect(actualVNode).toStrictEqual(expectedVNode)
      })
    })

    it('Should return vnode with nested child', () => {
      let actualVNode: vNode
      let expectedVNode: vNode

      given(() => {
        expectedVNode = {
          tag: 'div',
          props: null,
          child: [
            {
              tag: 'h1',
              props: null,
              child: [],
            },
          ],
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

  describe('`render` function should create HTMLElement from vnode config', () => {
    describe('created element should be equal element, which will be generated `h`', () => {
      it('empty `div`', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement

        given(() => {
          vNode = {
            tag: 'div',
            props: null,
            child: [],
          }
        })

        given('Create div HTMLElement', () => {
          $expectedNode = Core.render(<div />)
        })

        when(() => {
          $actualNode = Core.render(vNode)
        })

        then(() => {
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })

      it('`div` with props', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement

        given(() => {
          vNode = {
            tag: 'div',
            props: {
              id: 'test-id',
            },
            child: [],
          }
        })

        given('Create div HTMLElement', () => {
          $expectedNode = Core.render(<div id='test-id'></div>)
        })

        when(() => {
          $actualNode = Core.render(vNode)
        })

        then(() => {
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })

      it('`div` with multiple class', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement

        given(() => {
          vNode = {
            tag: 'div',
            props: {
              className: 'multiple class',
            },
            child: [],
          }
        })

        given('Create div HTMLElement', () => {
          $expectedNode = Core.render(<div className='multiple class'></div>)
        })

        when(() => {
          $actualNode = Core.render(vNode)
        })

        then(() => {
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })

      it('`div` with nested `h` child', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement

        given(() => {
          vNode = {
            tag: 'div',
            props: null,
            child: [
              {
                tag: 'h1',
                props: null,
                child: [],
              },
            ],
          }
        })

        given('Create div HTMLElement with child', () => {
          $expectedNode = Core.render(
            <div>
              <h1></h1>
            </div>
          )
        })

        when(() => {
          $actualNode = Core.render(vNode)
        })

        then(() => {
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })

      it('`div` with nested `h1` child with props', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement

        given(() => {
          vNode = {
            tag: 'div',
            props: {
              id: 'div',
              className: 'multiple class',
            },
            child: [
              {
                tag: 'h1',
                props: {
                  id: 'h1',
                  className: 'h1 class-name',
                },
                child: ['Header'],
              },
            ],
          }
        })

        given('`div` with nested `h1`', () => {
          $expectedNode = Core.render(
            <div id='div' className='multiple class'>
              <h1 id='h1' className='h1 class-name'>
                Header
              </h1>
            </div>
          )
        })

        when(() => {
          $actualNode = Core.render(vNode)
        })

        then(() => {
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })

      it('`div` with ref attribute', () => {
        let vNode: vNode
        let $actualNode: HTMLElement
        let $expectedNode: HTMLElement
        let context: any

        given(() => {
          vNode = {
            tag: 'div',
            props: {
              ref: 'div'
            },
            child: []
          }

          context = {
            refs: {}
          }
        })

        when(() => {
          $actualNode = Core.render(vNode, context)
        })

        then(() => {
          $expectedNode = context.refs.div
          expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
        })
      })
    })
  })
})
