import MutationObserver from 'mutation-observer'
import Pjax from './Pjax'

/**
 * Component Class
 */
export default class Component {

  /**
   * constructor
   *
   * @param element - Element
   */
  constructor(element) {
    this.element = element
    this._init()

    this.pjax = Pjax.create()
    this.pjax.on(Pjax.FETCH, () => this.fetch())
    this.pjax.on(Pjax.LOADED, () => this.loaded())
    this.pjax.on(Pjax.COMPLETE, () => this.complete())
  }

  _init() {
    const container = this.element.parentElement || document.body
    const observer = new MutationObserver((MutationRecords, MutationObserver) => {
      const added = MutationRecords[0].addedNodes[0] === this.element
      const removed = MutationRecords[0].removedNodes[0] === this.element
      if (added) {
        this.mount()
      }
      if (removed) {
        this.unMount()
      }
    })

    observer.observe(container, {
      childList: true,
      subtree: true
    })
  }

  /**
   * pjaxのfetch
   */
  fetch() {
    console.log('component fetch', this)
  }

  /**
   * pjaxのdomのロード完了
   */
  loaded() {
    console.log('component loaded', this)
  }

  /**
   * pjaxの完了(アニメーション含めた)
   */
  complete() {
    console.log('component complete', this)
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
