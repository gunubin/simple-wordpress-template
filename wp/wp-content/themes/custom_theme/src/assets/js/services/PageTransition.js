/* @flow */
import EventEmitter from 'events'
import {Power2, TimelineLite, TweenMax} from "gsap"
import Pjax from '../lib/Pjax'
import timelinePromise from '../lib/timelinePromise'

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
    this.pjax.on(Pjax.FETCH, this.fetch.bind(this))
    this.pjax.on(Pjax.READY, this.loaded.bind(this))
    this.durationOut = 300
  }

  start() {
    this.pjax.start({
      wait: this.durationOut
    })
  }

  async fetch() {
    this.emit(PageTransition.FETCH)
    await this.out()
  }

  async loaded() {
    this.emit(PageTransition.LOADED)
    await this.in()
    this.emit(PageTransition.COMPLETE)
  }

  async out(): Promise<*> {
    const container = this.pjax.getContainer()
    const tl = new TimelineLite({paused: true})
    tl.to(container, this.durationOut / 1000, {opacity: 0})
    return timelinePromise(tl)
  }

  async in() {
    const container = this.pjax.getContainer()
    const tl = new TimelineLite({paused: true})
    tl.fromTo(container, this.durationOut / 1000, {opacity: 0}, {opacity: 1})
    return timelinePromise(tl)
  }

}


