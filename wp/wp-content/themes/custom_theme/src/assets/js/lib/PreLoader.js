/* @flow */
import _ from 'lodash'
import PageTransition from '../services/PageTransition'
import ProgressObserver from '../lib/ProgressObserver'

export default class PreLoader {

  manifest: {}
  pageTransition: PageTransition
  progressObserver: ProgressObserver

  constructor() {
    this.target = document.documentElement
    this.progressObserver = ProgressObserver.create()
    this.progressObserver.on(ProgressObserver.FILELOAD, this.fileLoaded.bind(this))

    this.pageTransition = PageTransition.create()
    this.pageTransition.on(PageTransition.LOADED, this.loadedPage.bind(this))
    this._init()
  }

  _init() {
    const preloads = this.target.querySelectorAll('.js-preload')
    this.manifest = [...preloads].map(element => {
      const src = element.dataset.src
      return {
        element,
        id: src,
        src,
      }
    })
    this.progressObserver.load(() => this.manifest)
  }

  fileLoaded(src: string) {
    const file = _.find(this.manifest, {src});
    file.element.src = src
  }

  loadedPage() {
    this._init()
  }
}
