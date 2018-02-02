import {EventEmitter} from 'events'
import Barba from 'barba.js'
import {Power2, TimelineLite, TweenMax} from "gsap"
import timelinePromise from '../lib/timelinePromise'

let singleton = null

export default class Pjax extends EventEmitter {

  static FETCH = 'fetch'
  static LOADED = 'loaded'
  static COMPLETE = 'complete'

  static create() {
    if (singleton) {
      return singleton
    }
    singleton = new Pjax()
    return singleton
  }

  constructor() {
    super()
    this._setup()
  }

  _setup() {
    const _this = this
    const PageTransition = Barba.BaseTransition.extend({
      start: function () {
        _this.emit(Pjax.FETCH)
        this.newContainerLoading.then(() => {
          _this.emit(Pjax.LOADED)
        })
        Promise
          .all([
            this.newContainerLoading,
            _this.pageOut(this.oldContainer)
          ])
          .then(function () {
            _this.pageIn(
              this.newContainer,
              this.oldContainer,
              this.done.bind(this)
            )
          }.bind(this))
      }
    })
    Barba.Pjax.getTransition = function () {
      return PageTransition
    }
  }

  pageOut(oldContainer) {
    const t = TweenMax.to(oldContainer, 0.5, {opacity: 0})
    return timelinePromise(t)
  }

  pageIn(newContainer, oldContainer, done) {
    TweenMax.to(oldContainer, 0.0, {opacity: 0})
    const tl = new TimelineLite({paused: true})
    tl.add([
      TweenMax.fromTo(newContainer, 1.5, {opacity: 0, visibility: 'visible'}, {opacity: 1})
    ])
    timelinePromise(tl).then(() => {
      done()
      this.emit(Pjax.COMPLETE)
    })
    tl.play()
  }

  start() {
    Barba.Pjax.start()
    Barba.Prefetch.init();
  }

}


