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
  for (const prop in props) {
    const value: any = props[prop]

    // TODO: Research alternative realization
    if (refPropHandler($el, prop, value, context)) continue
    if (classPropHandler($el, prop, value)) continue
    attributePropHandler($el, prop, value)
  }
}

function refPropHandler ($el: HTMLElement, attr: string, value: string, context?: any): boolean {
  if (attr === 'ref') {
    context.refs[value] = $el
    return true
  }
  return false
}

function classPropHandler ($el: HTMLElement, attr: string, value: any): boolean {
  if (attr === 'className') {
    value.split(' ').forEach((className: string) => {
      $el.classList.add(className)
    })
    return true
  }
  return false
}

function attributePropHandler ($el: HTMLElement, attr: string, value: any): boolean {
  $el.setAttribute(attr, value)
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
