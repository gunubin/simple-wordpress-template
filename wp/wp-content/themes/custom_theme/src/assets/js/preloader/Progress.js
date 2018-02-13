/* @flow */
import Preloader, {LOAD_TYPE} from './Preloader'

const DEFAULT_TIMEOUT: number= 30 * 1000

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

  on(...args) {
    this.loader.on(...args)
  }

  select() {
    return document.querySelector(this.selector)
  }

  attachAppJs(scriptTag: HTMLElement) {
    document.body.appendChild(scriptTag)
  }

  progress(percent: number) {
    console.log(percent)
    const p = this.select()
    p.style.opacity = 1
    p.style.width = `${percent * 100}%`
  }

  fileload(e) {
    const {item} = e
    console.log(item)
    if (item.type === LOAD_TYPE.js) {
      this.attachAppJs(item.tag)
    }
  }

  complete() {
    const p = this.select()
    p.style.opacity = 0
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
        ...manifest,
        {
          id: 'app.js',
          src: `${config.jsPath}/app.js`,
          loadTimeout: DEFAULT_TIMEOUT
        },
      ]
    }
    this.loader.load(manifest)
    this.isFirst = false
  }

  get loaded() {
    return this.loader.loader.loaded
  }

  get queues() {
    return this.loader.queues
  }
}

