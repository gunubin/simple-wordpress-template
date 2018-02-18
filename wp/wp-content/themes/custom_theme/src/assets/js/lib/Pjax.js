/* @flow */
import EventEmitter from 'events'
// FIXME: webpackに対応したか確認
// $FlowFixMe webpackに対応したか確認
import PjaxBase from 'pjax'

type Params = {
  selector: string,
  wait?: number
}

let singleton = null

export default class Pjax extends EventEmitter {

  selector: string

  static FETCH = 'fetch'
  static CONTENT = 'content'
  static READY = 'ready'
  static LOAD = 'load'

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
    // http://falsandtru.github.io/pjax-api/api/event/
    document.addEventListener('pjax:send', e => {
      this.emit(Pjax.FETCH, e)
    })
    document.addEventListener('pjax:complete', e => {
      this.emit(Pjax.READY, e)
    })
  }

  getContainer(): ?HTMLElement {
    return document.querySelector(this.selector)
  }

  start({wait = 0, ...params}: Params): PjaxBase {
    this.selector = params.selector
    return new PjaxBase({
      // elements: 'a:not([target]):not([href="javascript:void(0)"])',
      elements: 'a',
      selectors: [
        'title',
        this.selector,
      ],
      cacheBust: false,
      debug: false,
    })
  }

}


