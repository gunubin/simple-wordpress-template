/* @flow */
import EventEmitter from 'events'
import Preloader from '../preloader/Preloader'

let singleton: ?PreloadObserver = null

export default class PreloadObserver extends EventEmitter {

  global: window

  static COMPLETE = 'complete'

  static create() {
    if (singleton) {
      return singleton
    }
    singleton = new PreloadObserver()
    return singleton
  }

  constructor() {
    super()
    this.global = window
  }

  observe() {
    this.global.preloader.on(Preloader.COMPLETE, this.complete.bind(this))
    if (this.global.preloader.loaded) {
      setImmediate(this.complete.bind(this))
    }
  }

  complete() {
    this.emit(PreloadObserver.COMPLETE)
  }


}
