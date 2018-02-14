/* @flow */
import {LOAD_TYPE} from '../preloader/Preloader'
import PageTransition from './PageTransition'

export default class ImagePreloadObserver {
  global: window
  pageTransition: PageTransition
  target: HTMLElement | Document

  constructor() {
    this.global = window
    this.target = document

    this.pageTransition = PageTransition.create()
    this.pageTransition.on(PageTransition.LOADED, this._loadedPageTransition.bind(this))
  }

  _loadedPageTransition() {
    this.global.preloader.load()
  }

  _attach() {
    const elements = [...this.target.querySelectorAll('.js-preload')]
    elements.map((e: HTMLElement) => {
      const {src} = e.dataset
      const preloadItems = this.global.preloader.queues
      const item = preloadItems.find(i => i.src === src)
      if (item && item.type === LOAD_TYPE.image) {
        item.element.parentNode.replaceChild(item.tag, item.element)
      }
    })
  }

  observe() {
    this.global.preloader.on('complete', () => {
      this._attach()
    })
    if (this.global.preloader.loaded) {
      this._attach()
    }
  }

}
