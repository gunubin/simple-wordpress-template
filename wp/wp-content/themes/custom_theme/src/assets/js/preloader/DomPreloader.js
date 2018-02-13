/* @flow */
import 'whatwg-fetch'
import EventEmitter from 'events'
import type {FileLoadResult} from './StreamLoader'
import StreamLoader from './StreamLoader'

export default class Preloader extends EventEmitter {
  static PROGRESS = 'progress'
  static FILELOAD = 'fileload'
  static COMPLETE = 'complete'

  isComplete: boolean = false
  streamLoader: StreamLoader

  constructor() {
    super()
    this.streamLoader = new StreamLoader()
    this.streamLoader.on(StreamLoader.PROGRESS, this.progress.bind(this))
    this.streamLoader.on(StreamLoader.FILELOAD, this.fileload.bind(this))
    this.streamLoader.on(StreamLoader.COMPLETE, this.complete.bind(this))
  }

  progress(percent: number) {
    const p = document.querySelector('.progress-bar')
    p.style.opacity = 1
    p.style.width = `${percent * 100}%`
    this.emit(Preloader.PROGRESS, percent)
  }

  fileload(item: FileLoadResult) {
    if (item.type === 'js') {
      const script = document.createElement('script')
      script.src = item.result.url
      document.body.appendChild(script)
    }
    this.emit(Preloader.FILELOAD, item)
  }

  complete() {
    console.log('preload.compelte')
    const p = document.querySelector('.progress-bar')
    p.style.opacity = 0
    console.log('Preloader.COMPLETE!!!!!!!!!')
    this.isComplete = true
    this.emit(Preloader.COMPLETE)
  }

  getPreloadManifest() {
    const elements = [...document.querySelectorAll('.js-preload')]
    const manifest = elements.map((e, i) => {
      return {
        id: e.dataset.src,
        type: 'image',
        url: e.dataset.src
      }
    })
    return manifest
  }

  start() {
    this.isComplete = false
    const manifest = [
      ...this.getPreloadManifest(),
      {
        id: 'app.js',
        type: 'js',
        url: '/wp/wp-content/themes/custom_theme/assets/js/app.js',
      },
    ]
    this.streamLoader.start(manifest)
  }

  load() {
    this.isComplete = false
    const manifest = this.getPreloadManifest()
    this.streamLoader.start(manifest)
  }

  get items() {
    return this.streamLoader.items
  }
}

