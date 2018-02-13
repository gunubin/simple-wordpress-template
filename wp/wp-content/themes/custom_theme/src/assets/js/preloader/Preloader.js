/* @flow */
import EventEmitter from 'events'

export type StreamType = 'js' | 'image'

type FetchObject = {
  total: number,
  process: () => void
}

type Manifest = {
  id: string,
  type: StreamType,
  url: string,
}

export type FileLoadResult = {
  result: {
    url: string,
    response: Response,
  }
} | Manifest


export default class StreamLoader extends EventEmitter {
  static PROGRESS = 'progress'
  static FILELOAD = 'fileload'
  static COMPLETE = 'complete'

  total: number = 0
  chunk: number = 0
  items: FileLoadResult[] = []
  manifest: Object = {}

  _getItem(manifest: Manifest) {
    return this.items.find(i => i.id === manifest.id)
  }

  _setup(res, manifest: Manifest): FetchObject {
    const _this = this
    const total = parseInt(res.headers.get('content-length'), 10)
    console.log(total)
    let filechunk = []
    return {
      total,
      process: (): Promise<*> => {
        let reader = res.body.getReader()
        return reader.read().then(function processResult(result) {
          if (result.done) {
            const result = {
              url: window.URL.createObjectURL(new Blob(filechunk)),
              response: res,
              total: total
            }
            const item = {...manifest, result}
            _this.items.push(item)
            _this.emit(StreamLoader.FILELOAD, item)
            return res
          }
          _this.chunk += result.value.length
          filechunk.push(result.value)
          _this.emit(StreamLoader.PROGRESS, _this.chunk / _this.total)
          return reader.read().then(processResult)
        })
      }
    }
  }

  setManifest(manifest: Manifest[]) {
    manifest.map(m => {
      this.manifest[m.id] = m
    })
  }

  start(manifest?: Manifest[]): Promise<*> {
    this.setManifest(manifest)
    console.log(this.manifest)
    this.chunk = 0
    return Promise.all(
      Object.keys(this.manifest).map(key => {
        const m = this.manifest[key]
        const has = this._getItem(m)
        if (has) {
          return Promise.resolve(has)
        }
        return fetch(m.url).then(res => {
          const o = this._setup(res, m)
          return {
            total: o.total,
            process: o.process,
          }
        })
      })
    ).then(list => {
      console.log(list)
      this.total = list.reduce((a, b) => {
        return a + b.total
      }, 0)
      console.log(this.total)
      return Promise.all(
        list.map(item => {
          if (item.process) {
            return item.process()
          } else {
            return Promise.resolve()
          }
        })
      ).then(() => {
        this.emit(StreamLoader.COMPLETE)
      })
    })
  }

}
