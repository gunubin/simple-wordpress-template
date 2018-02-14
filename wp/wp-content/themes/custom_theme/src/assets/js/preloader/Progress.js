/* @flow */
import type {Queue} from './Preloader'
import Preloader, {LOAD_TYPE} from './Preloader'

const DEFAULT_TIMEOUT: number = 30 * 1000

export default class Progress {

  isFirst: boolean = true
  loader: Preloader
  selector: string = '.progress-bar'

  constructor() {
    this.loader = new Preloader()
    this.loader.on(Preloader.PROGRESS, e => this.progress(e.progress))
    this.loader.on(Preloader.FILELOAD, this.fileload.bind(this))
    this.loader.on(Preloader.COMPLETE, this.complete.bind(this))
  }

  on(...args: any[]) {
    this.loader.on(...args)
  }

  select() {
    return document.querySelector(this.selector)
  }

  attachAppJs(scriptTag: HTMLElement) {
    const {body} = document
    body && body.appendChild(scriptTag)
  }

  progress(percent: number) {
    const p = this.select()
    if (p) {
      p.style.opacity = '1'
      p.style.width = `${percent * 100}%`
    }
  }

  fileload(e: any) {
    const {item} = e
    if (item.type === LOAD_TYPE.js) {
      this.attachAppJs(item.tag)
    }
  }

  complete() {
    const p = this.select()
    if (p) {
      p.style.opacity = '0'
    }
  }

  getManifest() {
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

  load() {
    let manifest = this.getManifest()
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

  get loaded(): boolean {
    return this.loader.loader.loaded
  }

  get queues(): Queue[] {
    return this.loader.queues
  }
}

