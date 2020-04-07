export function h (tag: string, props: any | null, ...child: string[] | vNode[]): vNode {
  return {
    tag,
    props,
    child
  }
}
