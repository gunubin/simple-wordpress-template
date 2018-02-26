/* @flow */
import {LOAD_TYPE} from '../preloader/Preloader'
import PageTransition from './PageTransition'
import PreloadObserver from './PreloadObserver'

export default class PreloadAttachment {
  global: window
  pageTransition: PageTransition
  target: HTMLElement | Document
  preloadObserver: PreloadObserver
  preloadSelector: string

  constructor(preloadSelector: string) {
    this.preloadSelector = preloadSelector
    this.global = window
    this.target = document

    this.preloadObserver = PreloadObserver.create()

    this.pageTransition = PageTransition.create()
    this.pageTransition.on(PageTransition.LOADED, this._loadedPageTransition.bind(this))

    this._loaded()
  }

  _loadedPageTransition() {
    this.global.preloader.load()
  }

  _attach() {
    const elements = [...this.target.querySelectorAll(this.preloadSelector)]
    // FIXME: srcが同じ場合にバグる
    elements.map((e: HTMLElement) => {
      const {src} = e.dataset
      const preloadItems = this.global.preloader.queues
      const item = preloadItems.find(i => i.src === src)
      if (item && item.type === LOAD_TYPE.image) {
        item.element.parentNode.replaceChild(item.tag, item.element)
      }
    })
  }

  _loaded() {
    this.preloadObserver.on(PreloadObserver.COMPLETE, this._attach.bind(this))
  }

}
