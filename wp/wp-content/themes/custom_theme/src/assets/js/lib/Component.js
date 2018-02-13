/* @flow */
import MutationObserver from 'mutation-observer'
import Mediaquery from '../services/Mediaquery'
import PageTransition from '../services/PageTransition'

export type Selector = () => HTMLElement

/**
 * Component Class
 */
export default class Component {
  container: HTMLElement
  element: ?HTMLElement
  className: string
  in_document: boolean
  observer: MutationObserver
  selector: Selector
  pageTransition: PageTransition
  mediaQuery: Mediaquery

  /**
   * constructor
   *
   * @param selector - string
   */
  constructor(selector: Selector) {
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
  }

  attach(selector: Selector) {
    this.setContainer()
    this.selector = selector
    if (!this.selector) {
      throw new ReferenceError('selector is not found.')
    }
    this.element = this.select()
    this.init()
  }

  setContainer(container: HTMLElement) {
    this.container = container || document.body
  }

  init() {
    this.in_document = this.container.contains(this.element)
    if (this.in_document) {
      setImmediate(this.ready.bind(this))
    }
    if (this.observer) {
      this.observer.disconnect()
    }
    this.observer = new MutationObserver((mutations, observer) => {
      this.element = this.select()
      // TODO: パフォーマンス確認
      if (this.container.contains(this.element)) {
        // if (!this.in_document) { // すでにある場合は発火しない
          setImmediate(this.mount.bind(this))
        // }
        this.in_document = true
      } else if (this.in_document) {
        this.in_document = false
        setImmediate(this.unMount.bind(this))
      }
    })

    this.observer.observe(this.container, {
      childList: true,
      subtree: true
    })
  }

  /**
   * select
   */
  select(): ?HTMLElement {
    if (typeof this.selector === 'function') {
      return this.selector()
    }
    return this.container.querySelector(this.selector)
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

}
