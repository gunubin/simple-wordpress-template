/* @flow */
import Pjax from '../lib/Pjax'
import {LOAD_TYPE} from './Preloader'

export default class ImageLoader {
  global: window
  pjax: Pjax

  constructor() {
    this.global = window
    this.target = document.documentElement

    this.pjax = Pjax.create()
    this.pjax.on(Pjax.READY, this.loaded.bind(this))

    this.global.preloader.on('complete', () => {
      this.start()
    })
    
    this.ready()
  }

  start() {
    const elements = [...this.target.querySelectorAll('.js-preload')]
    elements.map(e => {
      const {src} = e.dataset
      const preloadItems = this.global.preloader.queues
      const item = preloadItems.find(i => i.src === src)
      if (item && item.type === LOAD_TYPE.image) {
        item.element.parentNode.replaceChild(item.tag, item.element)
      }
    })
  }

  ready() {
    if (this.global.preloader.loaded) {
      this.start()
    }
  }

  loaded() {
    this.global.preloader.load()
  }

}
