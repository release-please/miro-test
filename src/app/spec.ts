import { createH1Element } from './'

describe('Project', () => {
  describe('When run test script', () => {
    it('createH1Element function should return equal HTMLElement of h1', () => {
      const textToContain = 'Hello'

      const expected = document.createElement('h1')
      expected.append(textToContain)

      const actual = createH1Element(textToContain)

      expect(actual.isEqualNode(expected)).toBeTruthy()
    })
  })
})
