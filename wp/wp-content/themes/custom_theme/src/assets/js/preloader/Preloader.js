/* @flow */
import createjs from 'preload-js'

export const LOAD_TYPE = {
  js: createjs.LoadQueue.JAVASCRIPT,
  image: createjs.LoadQueue.IMAGE,
}
export type LoadType = $Keys<typeof LOAD_TYPE>
export type Manifest = {
  id: string,
  src: string,
}
export type Queue = Manifest & {
  type: ?string,
  tag: ?HTMLElement,
  isComplete: boolean,
}

export default class Preloader {
  static PROGRESS = 'progress'
  static FILELOAD = 'fileload'
  static COMPLETE = 'complete'

  maxConnections: number = window.config.maxConnections
  queues: Queue[] = []
  loader: any

  constructor() {

    console.log('bbbbbbb')
    // xhrでダウンロード後に<img/>化される。その際にweb serverのアクセスログとしては2回アクセスログが残るが、
    // ブラウザキャッシュが有効であるのでxhr後のタグ生成時は304になる
    this.loader = new createjs.LoadQueue(process.env.NODE_ENV === 'production')
    // this.loader = new createjs.LoadQueue(true, '/')
    this.loader.setMaxConnections(this.maxConnections)
    this.loader.on('fileload', this.fileload.bind(this))
  }

  on(...args: any[]) {
    this.loader.on(...args)
  }

  fileload(e: any) {
    const {item} = e
    const queue = this.queues.find(q => q.id === item.id)
    if (queue) {
      queue.type = item.type
      queue.tag = item.tag
      queue.isComplete = true
    }
  };

  transformQueue(manifest: Manifest[]): Queue[] {
    return manifest.map((m: Manifest) => {
      return {
        ...m,
        type: '',
        tag: null,
        isComplete: false
      }
    })
  }

  load(manifest: Manifest[]) {
    this.queues = this.transformQueue(manifest)
    this.loader.loadManifest(manifest)
  }

}
