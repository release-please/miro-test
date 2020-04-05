interface vNode {
  tag: string,
  props: null | any,
  child: string[] | vNode[]
}

export function h (tag: string, props: any, ...child: string[] | vNode[]): vNode {
  return {
    tag,
    props,
    child
  }
}
