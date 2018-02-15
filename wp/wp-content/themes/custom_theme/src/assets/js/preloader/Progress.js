/* @flow */
import type {Queue} from './Preloader'
import Preloader, {LOAD_TYPE} from './Preloader'

const DEFAULT_TIMEOUT: number = 30 * 1000

export default class Progress {

  isFirst: boolean = true
  loader: Preloader
  percent: number = 0
  selector: string
  preloadSelector: string

  constructor(selector: string, preloadSelector: string) {
    this.selector = selector
    this.preloadSelector = preloadSelector
    this.loader = new Preloader()
    this.loader.on(Preloader.PROGRESS, e => this._progress(e.progress))
    this.loader.on(Preloader.FILELOAD, this._fileload.bind(this))
    this.loader.on(Preloader.COMPLETE, this._complete.bind(this))
  }

  _select() {
    return document.querySelector(this.selector)
  }

  _attachAppJs(scriptTag: HTMLElement) {
    const {body} = document
    body && body.appendChild(scriptTag)
  }


  _progress(percent: number) {
    this.percent = percent
    const bar = this._select()
    if (bar) {
      bar.classList.add('show')
      bar.style.opacity = '1'
      bar.style.width = `${percent * 100}%`
    }
  }

  _fileload(e: any) {
    const {item} = e
    if (item.type === LOAD_TYPE.js) {
      this._attachAppJs(item.tag)
    }
  }

  _complete() {
  }

  _getManifest() {
    const elements = [...document.querySelectorAll('.js-preload')]
    return elements.map(e => {
      return {
        element: e,
        id: e.dataset.src,
        src: e.dataset.src,
        loadTimeout: DEFAULT_TIMEOUT
      }
    })
  }

  on(...args: any[]) {
    this.loader.on(...args)
  }

  load() {
    let manifest = this._getManifest()
    // 初回だけjsロード
    if (this.isFirst) {
      manifest = [
        {
          id: 'app.js',
          src: `${config.jsRelativeUrl}/app.js`,
          loadTimeout: DEFAULT_TIMEOUT
        },
        ...manifest,
      ]
    }
    this.loader.load(manifest)
    this.isFirst = false
  }

  reset() {
    const bar = this._select()
    if (bar) {
      bar.classList.remove('show')
      bar.style.width = '0%'
    }
  }

  get loaded(): boolean {
    return this.loader.loader.loaded
  }

  get queues(): Queue[] {
    return this.loader.queues
  }
}

