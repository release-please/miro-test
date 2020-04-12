export function isEmailValid (value: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return re.test(value)
}

class Observer {
  _subscribers: Map<string, Set<Function>> = new Map()

  public on (event: string, callback: Function): boolean {
    if (typeof callback !== 'function') {
      return false
    }

    if (this._subscribers.has(event)) {
      this._subscribers.get(event)?.add(callback)
    } else {
      this._subscribers.set(event, new Set([callback]))
    }
    return true
  }

  public off (event: string, callback: Function): boolean {
    if (typeof callback !== 'function') {
      return false
    }

    if (this._subscribers.has(event)) {
      const subscribers = this._subscribers.get(event)
      if (subscribers?.has(callback) ?? false) {
        subscribers?.delete(callback)
        return true
      }
    }
    return false
  }

  emit (event: string, ...args: any[]): void {
    const callbacks = this._subscribers.get(event)
    if (callbacks != null) {
      callbacks.forEach(fn => { fn(...args) })
    }
  }
}

export {
  Observer
}
