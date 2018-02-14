/* @flow */
import Mediaquery from '../services/Mediaquery'
import PageTransition from '../services/PageTransition'
import MountObserver from '../services/MountObserver'
import Window from '../services/Window'

export type Selector = string | () => HTMLElement

export type Options = {
  mutationObservable: boolean,
  pageTransitable: boolean,
  mediaQuery: boolean,
}

const DEFAULT_OPTIONS: Options = {
  mutationObservable: false,
  pageTransitable: true,
  mediaQuery: true,
}

/**
 * Component Class
 */
export default class Component {
  container: ?HTMLElement
  element: ?HTMLElement
  className: string
  selector: Selector
  pageTransition: PageTransition
  mediaQuery: Mediaquery
  mountObserver: MountObserver
  options: Options
  window: Window


  /**
   * constructor
   *
   * @param selector - string
   * @param mutationObservable
   * @param options
   */
  constructor(selector: Selector, options: Options) {
    this.options = {
      ...DEFAULT_OPTIONS,
      options,
    }
    if (selector) {
      this.attach(selector)
    }
    this._inject()
  }

  _inject() {
    this.pageTransition = PageTransition.create()
    this.pageTransition.on(PageTransition.FETCH, this.fetch.bind(this))
    this.pageTransition.on(PageTransition.LOADED, this.loaded.bind(this))
    this.pageTransition.on(PageTransition.LOADED, this.select.bind(this))
    this.pageTransition.on(PageTransition.COMPLETE, this.complete.bind(this))

    this.mediaQuery = Mediaquery.create()
    this.mediaQuery.on(Mediaquery.CHANGE, this.changeMediaquery.bind(this))

    this.window = Window.create()
    this.window.on(Window.CHANGE_ORIENTATION, this.changeOrientation.bind(this))
  }

  attach(selector: Selector) {
    this.setContainer()
    this.selector = selector
    if (!this.selector) {
      throw new ReferenceError('selector is not found.')
    }
    this.element = this.select()
    if (this.options.mutationObservable && this.element && this.container) {
      this.mountObserver = new MountObserver(this.element, this.container)
      this.mountObserver.on(MountObserver.MOUNT, this.mount.bind(this))
      this.mountObserver.on(MountObserver.UNMOUNT, this.unMount.bind(this))
    }
  }

  setContainer(container?: HTMLElement) {
    this.container = container || document.body
  }

  /**
   * select
   */
  select(): ?HTMLElement {
    if (typeof this.selector === 'function') {
      return this.selector()
    }
    return this.container && this.container.querySelector(this.selector)
  }

  /**
   * ページ遷移のfetch
   */
  fetch() {
  }

  /**
   * ページ遷移のdomのロード完了
   */
  loaded() {
  }

  /**
   * ページ遷移の完了(アニメーション含めた)
   */
  complete() {
  }

  /**
   * ready
   */
  ready() {

  }

  /**
   * mount
   */
  mount() {
  }

  /**
   * unMount
   */
  unMount() {
  }

  /**
   * changeMediaquery
   */
  changeMediaquery() {
  }

  /**
   * changeOrientation
   */
  changeOrientation() {
  }

}
