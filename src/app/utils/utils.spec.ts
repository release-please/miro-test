import { isEmailValid, Observer } from '.'

describe('Test #Utils', () => {
  describe('Email validator', () => {
    it('Valid email `qwe@qwe.com`. Should be true', () => {
      expect(isEmailValid('qwe@qwe.com')).toBeTruthy()
    })

    it('Invalid email `qwe.qwe.com`. Should be false', () => {
      expect(isEmailValid('qwe.qwe.com')).toBeFalsy()
    })

    it('Empty email. Should be false', () => {
      expect(isEmailValid('')).toBeFalsy()
    })
  })

  describe('Observer', () => {
    describe('Add listener', function () {
      it('Valid listener as function. Return true', function () {
        const observer = new Observer()
        const isAdded = observer.on('function', (): any => ({}))
        expect(isAdded).toBeTruthy()
      })

      it('Broadcast message', function () {
        const observer = new Observer()
        let actualAfterBroadcast
        observer.on('broadcast', (...args: any[]) => {
          actualAfterBroadcast = args[0]
        })

        observer.emit('broadcast', 'Expected value')

        expect(actualAfterBroadcast).toBe('Expected value')
      })

      describe('Invalid listener. Return false', function () {
        const testSuites = [
          {
            label: 'string',
            value: 'string'
          },
          {
            label: 'number',
            value: 123
          },
          {
            label: 'boolean',
            value: true
          },
          {
            label: 'undefined',
            value: undefined
          },
          {
            label: 'null',
            value: null
          },
          {
            label: 'array',
            value: []
          },
          {
            label: 'object',
            value: {}
          }
        ]

        testSuites.forEach((test: { label: string, value: any }) => {
          it(`as ${test.label}`, function () {
            const observer = new Observer()
            const onListenerWrapper = (event: string, callback: any): boolean => {
              return observer.on(event, callback)
            }

            const isAdded = onListenerWrapper(test.label, test.value)

            expect(isAdded).toBeFalsy()
          })
        })
      })
    })

    describe('Remove listener', function () {
      it('Known listener. Return true if exist', function () {
        const observer = new Observer()
        const callback = (): any => ({})

        observer.on('known', callback)

        const isRemoved = observer.off('known', callback)

        expect(isRemoved).toBeTruthy()
      })

      describe('Should return false', function () {
        it('Unknown listener as function', function () {
          const observer = new Observer()
          const callback = (): any => ({})

          const isRemoved = observer.off('unknown', callback)

          expect(isRemoved).toBeFalsy()
        })

        it('Not function', function () {
          const observer = new Observer()
          const offListenerWrapper = (event: string, callback: any): boolean => {
            return observer.off(event, callback)
          }

          const isRemoved = offListenerWrapper('unknown', '')

          expect(isRemoved).toBeFalsy()
        })
      })
    })
  })
})
