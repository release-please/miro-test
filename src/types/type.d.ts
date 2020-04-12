interface vNode {
  tag: string
  props: null | any
  child: string[] | vNode[]
}

declare namespace JSX {
  type Element = vNode
  interface IntrinsicElements { [tagName: string]: any }
}

// Fix for input HTMLElement
interface InputElementTarget extends EventTarget {
  value: string
}

interface InputEvent extends KeyboardEvent {
  target: InputElementTarget
}