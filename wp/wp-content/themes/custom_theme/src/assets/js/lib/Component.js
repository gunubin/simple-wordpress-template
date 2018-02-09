/* @flow */
import MutationObserver from 'mutation-observer'
import Pjax from '../services/Pjax'

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
  pjax: Pjax

  /**
   * constructor
   *
   * @param selector - string
   */
  constructor(selector: Selector) {
    if (selector) {
      this.attach(selector)
    }
    this._injectPjax()
  }

  _injectPjax() {
    this.pjax = Pjax.create()
    this.pjax.on(Pjax.FETCH, this.fetch.bind(this))
    this.pjax.on(Pjax.LOADED, this.loaded.bind(this))
    this.pjax.on(Pjax.LOADED, this.select.bind(this))
    this.pjax.on(Pjax.COMPLETE, this.complete.bind(this))
  }

  attach(selector: Selector) {
    this.container = this.container || document.body
    this.selector = selector
    if (!this.selector) {
      throw new ReferenceError('selector is not found.')
    }
    this.element = this.select()
    this.init()
  }

  setContainer(container: HTMLElement) {
    this.container = container
  }

  init() {
    this.in_document = this.container.contains(this.element)
    if (this.in_document) {
      this.ready()
    }
    if(this.observer) {
      this.observer.disconnect()
    }
    this.observer = new MutationObserver((mutations, observer) => {
      this.element = this.select()
      // TODO: パフォーマンス確認
      if (this.container.contains(this.element)) {
        if (!this.in_document) {
          this.mount()
        }
        this.in_document = true
      } else if (this.in_document) {
        this.in_document = false
        this.unMount()
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
   * pjaxのfetch
   */
  fetch(oldContainer: HTMLElement) {
  }

  /**
   * pjaxのdomのロード完了
   */
  loaded() {
  }

  /**
   * pjaxの完了(アニメーション含めた)
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

}
