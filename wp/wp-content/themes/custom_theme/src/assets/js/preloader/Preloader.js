/* @flow */
import createjs from 'preload-js'

export const LOAD_TYPE = {
  js: createjs.LoadQueue.JAVASCRIPT,
  image: createjs.LoadQueue.IMAGE,
}
export type LoadType = $Keys<typeof LOAD_TYPE>

type Manifest = {
  id: string,
  src: string,
}
type Queue = {
  isComplete: boolean
} | Manifest

export default class Preloader {
  static PROGRESS = 'progress'
  static FILELOAD = 'fileload'
  static COMPLETE = 'complete'

  maxConnections: number = 3
  queues: Queue[] = []
  loader: any

  constructor() {
    this.loader = new createjs.LoadQueue(process.env.NODE_ENV === 'production')
    // this.loader = new createjs.LoadQueue(true)
    this.loader.setMaxConnections(this.maxConnections)
    this.loader.on('fileload', this.fileload.bind(this))
  }

  on(...args) {
    this.loader.on(...args)
  }

  fileload(e) {
    const {item} = e
    const queue = this.queues.find(q => q.id === item.id)
    if (queue) {
      queue.type = item.type
      queue.tag = item.tag
      queue.isComplete = true
    }
  };

  transformQueue(manifest: Manifest): Queue {
    return manifest.map(m => {
      return {
        ...m,
        type: '',
        tag: '',
        isComplete: false
      }
    })
  }

  load(manifest: Manifest) {
    this.queues = this.transformQueue(manifest)
    this.loader.loadManifest(manifest)
  }

}
