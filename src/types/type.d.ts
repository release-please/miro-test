interface vNode {
  tag: string
  props: null | any
  child: string[] | vNode[]
}

declare namespace JSX {
  type Element = vNode
  interface IntrinsicElements { [tagName: string]: any }
}
