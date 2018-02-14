/* @flow */
import EventEmitter from 'events'

let singleton: ?Mediaquery = null

export default class Mediaquery extends EventEmitter {
  screenMode: string
  vars: Object

  static CHANGE: string = 'change'

  static create(vars?: Object) {
    if (singleton) {
      return singleton
    }
    singleton = new Mediaquery(vars || {})
    return singleton
  }

  constructor(vars: Object) {
    super()
    this.vars = vars
    this.screenMode = ''

    Object.keys(this.vars).map(key => {
      const val = this.vars[key]
      const mql = window.matchMedia(val)
      mql.addListener(mql => {
        if (mql.matches) {
          this.changeScreenMode(key)
        }
      })
      if (mql.matches) {
        this.screenMode = key
      }
    })
  }

  changeScreenMode(current: string) {
    if (this.screenMode !== current) {
      this.screenMode = current
      this.emit(Mediaquery.CHANGE, this)
    }
  }
}

