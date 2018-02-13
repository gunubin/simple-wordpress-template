/* @flow */
import createjs from 'preload-js'
import Logger from './Logger'
import EventEmitter from 'events'

let singleton = null

/**
 * ProgressObserver
 */
export default class ProgressObserver extends EventEmitter {

  static PROGRESS: string = 'progress'
  static FILELOAD: string = 'fileload'
  static COMPLETE: string = 'complete'

  static create() {
    if (singleton) {
      return singleton
    }
    singleton = new ProgressObserver()
    return singleton
  }

  constructor() {
    super()

    const isAjax = process.env.NODE_ENV === 'production'
    this.queue = new createjs.LoadQueue(isAjax)
    this.queue.on('error', this.error.bind(this));
    this.queue.on('progress', this.progress.bind(this));
    this.queue.on('fileload', this.fileload.bind(this))
    this.queue.on('complete', this.complete.bind(this))
  }

  load(getManifest: () => Object) {
    // this.reset()

    this.manifest = getManifest()
    const mf = Object.keys(this.manifest).map(key => {
      const {type, src, id} = this.manifest[key]
      return {
        type,
        src,
        id,
        loadTimeout: 300000
      }
    })

    if (mf.length > 0) {
      this.queue.loadManifest(mf)
    } else {
      this.complete()
    }
  };

  error(e) {
    Logger.error(e)
  }

  fileload(e) {
    Logger.log(e)
    const {src} = e.item
    this.emit(ProgressObserver.FILELOAD, src)
  }

  progress(e) {
    this.emit(ProgressObserver.PROGRESS, e.loaded)
  };

  complete() {
    Logger.info('complete')
    this.emit(ProgressObserver.COMPLETE)
  }
}
