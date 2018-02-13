/* @flow */
import Pjax from '../lib/Pjax'
import Preloader from './Preloader'

export default class PreloaderAttacher {
  global: window
  pjax: Pjax

  constructor() {
    this.global = window
    this.target = document.documentElement

    this.pjax = Pjax.create()
    this.pjax.on(Pjax.READY, this.loaded.bind(this))


    window.preloader.on(Preloader.COMPLETE, () => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      this.start()
    })
    
    this.ready()
  }

  start() {
    const elements = [...this.target.querySelectorAll('.js-preload')]
    console.log(elements)
    elements.map(e => {
      const {src} = e.dataset
      const preloadItems = this.global.preloader.items
      const i = preloadItems.find(i => i.url === src)
      console.log(src, i && i.result.url)
      e.src = i && i.result.url
    })
  }

  ready() {
    console.log(window.preloader.isComplete)
    if (window.preloader.isComplete) {
      console.log('bbbbbbbbbbbbbbbbbbbbb')
      this.start()
    }
  }

  loaded() {
    if (window.preloader.isComplete) {
      // console.log('ccccccccccccccccccccccc')
      // this.start()
    }
    window.preloader.load()
  }

}
