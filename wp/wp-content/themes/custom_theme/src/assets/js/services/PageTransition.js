/* @flow */
import EventEmitter from 'events'
import {Power2, TimelineLite, TweenMax} from "gsap"
import Pjax from '../lib/Pjax'
import {timelinePromise} from '../lib/promisfy'

let singleton = null

export default class PageTransition extends EventEmitter {
  durationOut: number
  pjax: Pjax

  static FETCH = 'fetch'
  static LOADED = 'loaded'
  static COMPLETE = 'complete'

  static create() {
    if (singleton) {
      return singleton
    }
    singleton = new PageTransition()
    return singleton
  }

  constructor() {
    super()
    this.pjax = Pjax.create()
    this.pjax.on(Pjax.FETCH, this._fetch.bind(this))
    this.pjax.on(Pjax.READY, this._loaded.bind(this))
    this.durationOut = 300
  }

  async _fetch() {
    this.emit(PageTransition.FETCH)
    await this._out()
  }

  async _loaded() {
    this.emit(PageTransition.LOADED)
    await this._in()
    this.emit(PageTransition.COMPLETE)
  }

  async _out(): Promise<TimelineLite> {
    const container = this.pjax.getContainer()
    const tl = new TimelineLite({paused: true})
    // tl.to(container, this.durationOut / 1000, {opacity: 0})
    // tl.to(container, 0, {opacity: 0})
    return timelinePromise(tl)
  }

  async _in(): Promise<TimelineLite> {
    const container = this.pjax.getContainer()
    const tl = new TimelineLite({paused: true})
    // tl.fromTo(container, this.durationOut / 1000, {opacity: 0}, {opacity: 1})
    return timelinePromise(tl)
  }

  start(containerSelector: string) {
    this.pjax.start({
      selector: containerSelector,
      wait: 0
    })
  }

}


