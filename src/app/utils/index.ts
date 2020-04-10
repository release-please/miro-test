export function isEmailValid (value: string): boolean {
  // eslint-disable-next-line no-control-regex
  const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
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
