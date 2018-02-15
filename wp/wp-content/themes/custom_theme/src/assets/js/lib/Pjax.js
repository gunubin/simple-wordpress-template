/* @flow */
import EventEmitter from 'events'
// FIXME: webpackに対応したか確認
// $FlowFixMe webpackに対応したか確認
const PjaxBase = require("exports-loader?require!pjax-api")('pjax-api').Pjax;

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
    window.addEventListener('pjax:fetch', e => {
      this.emit(Pjax.FETCH, e)
    })
    document.addEventListener('pjax:content', e => {
      this.emit(Pjax.CONTENT, e)
    })
    document.addEventListener('pjax:ready', e => {
      this.emit(Pjax.READY, e)
    })
    window.addEventListener('pjax:load', e => {
      this.emit(Pjax.LOAD, e)
    })
  }

  getContainer(): ?HTMLElement {
    return document.querySelector(this.selector)
  }

  start({wait = 0, ...params}: Params): PjaxBase {
    this.selector = params.selector
    return new PjaxBase({
      areas: [
        this.selector, // try to use the first query.
        'body', // fallback.
      ],
      link: 'a:not([target]):not([href="javascript:void(0)"])',
      fetch: {
        timeout: 3000 * 10,
        wait: wait,
      },
      update: {
        css: false,
        script: false,
      }
    });
  }

}


