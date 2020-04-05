import '../styles/styles.scss'

export function createH1Element (text: string): HTMLElement {
  const $el = document.createElement('h1')
  $el.append(text)
  return $el
}

document.body.onload = () => {
  document.body.append(createH1Element('Test Typescript and HTML'))
}
