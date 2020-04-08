// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '.'
import * as Core from '.'

describe('Core test', () => {
  it.todo('Research: `Core.render()` prop handlers. Patterns, loop, if-else alternative. See TODO')
  it.todo('`Core.render()` ref without context')

  describe('`h` - function', () => {
    it('Should return vnode with `ref` attribute', () => {
      const refName = 'test-ref'
      const expectedVNode: vNode = {
        tag: 'div',
        props: {
          ref: refName,
        },
        child: [],
      }

      const actualVNode: vNode = <div ref={refName}></div>

      expect(actualVNode).toStrictEqual(expectedVNode)
    })

    it('Should return vnode with empty `attr`', () => {
      const expectedVNode: vNode = {
        tag: 'div',
        props: null,
        child: [],
      }

      const actualVNode: vNode = <div></div>

      expect(actualVNode).toStrictEqual(expectedVNode)
    })

    it('Should return vnode with nested child', () => {
      const expectedVNode: vNode = {
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

      const actualVNode: vNode = (
        <div>
          <h1></h1>
        </div>
      )

      expect(actualVNode).toStrictEqual(expectedVNode)
    })

    it('`button` with `click` event', () => {
      const onClick = (): any => ({})

      const expectedVNode: vNode = {
        tag: 'button',
        props: {
          onclick: onClick,
        },
        child: [],
      }

      const actualVNode: vNode = <button onclick={onClick} />

      expect(actualVNode).toStrictEqual(expectedVNode)
    })
  })

  describe('`render` function should create HTMLElement from vnode config', () => {
    describe('created element should be equal element, which will be generated `h`', () => {
      it('empty `div`', () => {
        const vNode: vNode = {
          tag: 'div',
          props: null,
          child: [],
        }
        const $expectedNode: HTMLElement = Core.render(<div />)

        const $actualNode: HTMLElement = Core.render(vNode)

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('`div` with props', () => {
        const vNode: vNode = {
          tag: 'div',
          props: {
            id: 'test-id',
          },
          child: [],
        }
        const $expectedNode: HTMLElement = Core.render(<div id='test-id'></div>)

        const $actualNode: HTMLElement = Core.render(vNode)

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('`div` with multiple class', () => {
        const vNode: vNode = {
          tag: 'div',
          props: {
            className: 'multiple class',
          },
          child: [],
        }
        const $expectedNode: HTMLElement = Core.render(<div className='multiple class'></div>)

        const $actualNode: HTMLElement = Core.render(vNode)

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('`div` with nested `h` child', () => {
        const vNode: vNode = {
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
        const $expectedNode: HTMLElement = Core.render(
          <div>
            <h1></h1>
          </div>
        )

        const $actualNode: HTMLElement = Core.render(vNode)

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('`div` with nested `h1` child with props', () => {
        const vNode: vNode = {
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
        const $expectedNode: HTMLElement = Core.render(
          <div id='div' className='multiple class'>
            <h1 id='h1' className='h1 class-name'>
              Header
            </h1>
          </div>
        )

        const $actualNode: HTMLElement = Core.render(vNode)

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('`div` with ref attribute', () => {
        const vNode: vNode = {
          tag: 'div',
          props: {
            ref: 'div'
          },
          child: []
        }

        const context: any = {
          refs: {}
        }

        const $actualNode: HTMLElement = Core.render(vNode, context)

        const $expectedNode: HTMLElement = context.refs.div

        expect($actualNode.isEqualNode($expectedNode)).toBeTruthy()
      })

      it('should call function on click event', () => {
        const expectedValue = 'changed'
        let actualValue: string = 'actual'
        const onClick = (): void => {
          actualValue = 'changed'
        }

        const $el = Core.render(
          <button onclick={onClick}></button>
        )
        $el.click()

        expect(actualValue).toBe(expectedValue)
      })

      it('should call function with context on click event', () => {
        const expectedValue = {
          value: 'expected'
        }
        const actualValue = {
          value: ''
        }

        function onClick (this: any): void {
          this.value = 'expected'
        }

        const $el = Core.render(
          <button onclick={onClick}></button>,
          actualValue
        )
        $el.click()

        expect(actualValue).toStrictEqual(expectedValue)
      })
    })
  })
})
