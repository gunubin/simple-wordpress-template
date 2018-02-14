/* @flow */
import EventEmitter from 'events'

let singleton: ?Window = null

export default class Window extends EventEmitter {

  static CHANGE_ORIENTATION = 'change_orientation'

  initialWidth: number
  initialHeight: number
  orientationChangeWidth: number
  orientationChangeHeight: number

  static create() {
    if (singleton) {
      return singleton
    }
    singleton = new Window()
    return singleton
  }

  constructor() {
    super()
    this.initialWidth = window.innerWidth
    this.initialHeight = window.innerHeight
    window.addEventListener('orientationchange', this.changeOrientation.bind(this))
    window.addEventListener('resize', this.changeOrientation.bind(this))
  }

  /**
   * android 対応
   * 参考サイト(下記のJSは動かないので独自で実装)
   * https://github.com/tomoyuki-wada/jquery.orientation_lib/blob/master/document(jp).md
   */
  changeOrientation() {
    this.orientationChangeWidth = window.innerWidth
    this.orientationChangeHeight = window.innerHeight

    if (this.orientationChangeWidth !== this.initialWidth) {
      this.initialWidth = this.orientationChangeWidth
      setImmediate(() => this.emit(Window.CHANGE_ORIENTATION))
    }
    if (this.orientationChangeHeight !== this.initialHeight) {
      this.initialHeight = this.orientationChangeHeight
    }
  }

}
