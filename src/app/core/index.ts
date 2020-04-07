export function h (tag: string, props: any | null, ...child: string[] | vNode[]): vNode {
  return {
    tag,
    props,
    child
  }
}

export function render (vnode: vNode, context?: any): HTMLElement {
  const { tag, props, child } = vnode
  const $el = document.createElement(tag)
  propsHandler($el, props, context)
  childHandler($el, child, context)
  return $el
}

function propsHandler ($el: HTMLElement, props: any, context?: any): void {
  // TODO: Research alternative realization
  for (const prop in props) {
    const value: any = props[prop]

    if (refPropHandler($el, prop, value, context)) continue
    if (classPropHandler($el, prop, value)) continue
    attributePropHandler($el, prop, value)
  }
}

function refPropHandler ($el: HTMLElement, prop: string, value: string, context?: any): boolean {
  if (prop === 'ref' && context != null) {
    context.refs[value] = $el
    return true
  }
  return false
}

function classPropHandler ($el: HTMLElement, prop: string, value: any): boolean {
  if (prop === 'className') {
    const classNames = value.split(' ')
    classNames.forEach((className: string) => {
      $el.classList.add(className)
    })
    return true
  }
  return false
}

function attributePropHandler ($el: HTMLElement, prop: string, value: any): boolean {
  $el.setAttribute(prop, value)
  return true
}

function childHandler ($el: HTMLElement, child: string[] | vNode[], context?: any): void {
  child.forEach((child: string | vNode) => {
    if (typeof child === 'string') {
      $el.append(child)
    } else {
      $el.append(render(child, context))
    }
  })
}
