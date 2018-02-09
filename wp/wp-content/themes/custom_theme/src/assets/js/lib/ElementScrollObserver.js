/* @flow */
import 'intersection-observer'
import EventEmitter from 'events'

export default class ElementScrollObserver extends EventEmitter {
  element: HTMLElement | null
  fps: number

  static SCROLL_UP: string = 'scroll-up'
  static SCROLL_DOWN: string = 'scroll-down'

  constructor(margin: number = 0) {
    super()
    this.margin = margin
    this.target = document.documentElement
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        let rect = entry.target.getBoundingClientRect()
        const isAbove = this.margin < rect.top && rect.top <= this.target.clientHeight + this.margin
        const isBelow = -this.margin <= rect.bottom && rect.bottom <= this.target.clientHeight - this.margin
        const isUp = isAbove && entry.isIntersecting
        const isDown = isBelow && entry.isIntersecting
        if (isUp) {
          this.emit(ElementScrollObserver.SCROLL_UP)
        }
        if (isDown) {
          this.emit(ElementScrollObserver.SCROLL_DOWN)
        }
      }
    }, {
      threshold: [0],
      rootMargin: `${this.margin}px`,
    })
  }

  observe(element: HTMLElement) {
    this.observer.observe(element)
  }

  unobserve(element: HTMLElement) {
    this.observer.unobserve(element)
  }

  disconnect() {
    this.observer.disconnect()
  }

}

