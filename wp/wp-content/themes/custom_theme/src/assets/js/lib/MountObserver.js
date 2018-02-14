/* @flow */
import MutationObserver from 'mutation-observer'
import EventEmitter from 'events'

export default class MountObserver extends EventEmitter {

  static MOUNT = 'mount'
  static UNMOUNT = 'unmount'

  container: HTMLElement | Document = document
  element: HTMLElement
  observer: MutationObserver
  _isContains: boolean = false

  constructor(element: HTMLElement, container: HTMLElement) {
    super()
    this.element = element
    this.container = container
    this._isContains = this.isContain()
    this.observer = new MutationObserver((mutations, observer) => {
      // TODO: パフォーマンス確認
      if (this.container.contains(this.element)) {
        this._isContains = true
        this.emit(MountObserver.MOUNT)
      } else if (this._isContains) {
        this._isContains = false
        this.emit(MountObserver.UNMOUNT)
      }
    })
  }

  isContain(): boolean {
    return this.container.contains(this.element)
  }

  observe() {
    this.observer.observe(this.container, {
      childList: true,
      subtree: true
    })
  }

  unObserve() {
    this.observer.disconnect()
  }

}
