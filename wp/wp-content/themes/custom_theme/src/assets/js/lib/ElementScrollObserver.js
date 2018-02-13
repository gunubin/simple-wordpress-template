/* @flow */
import 'intersection-observer'
import EventEmitter from 'events'

export default class ElementScrollObserver extends EventEmitter {
  element: HTMLElement | null
  fps: number
  margin: number
  observer: IntersectionObserver
  target: ?HTMLElement

  static SCROLL_UP: string = 'scroll-up'
  static SCROLL_UP_PRE: string = 'scroll-up-pre'
  static SCROLL_DOWN: string = 'scroll-down'
  static SCROLL_DOWN_PRE: string = 'scroll-down-pre'

  constructor(margin: number = 0, ratio: number = 0.1) {
    super()
    this.margin = margin
    this.target = document.documentElement

    const threshold = [0, ratio]
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const isAbove = entry.boundingClientRect.y > entry.rootBounds.y
        const isBelow = !isAbove
        const isUp = isAbove && entry.isIntersecting
        const isDown = isBelow && entry.isIntersecting
        if (isUp) {
          if (entry.intersectionRatio > ratio) {
            this.emit(ElementScrollObserver.SCROLL_UP, entry.target)
          } else {
            this.emit(ElementScrollObserver.SCROLL_UP_PRE, entry.target)
          }
        }
        if (isDown) {
          if (entry.intersectionRatio > ratio) {
            this.emit(ElementScrollObserver.SCROLL_DOWN, entry.target)
          } else {
            this.emit(ElementScrollObserver.SCROLL_DOWN_PRE, entry.target)
          }
        }
      }
    }, {
      threshold: threshold,
      rootMargin: `${this.margin}px`,
    })
  }

  observe(element: HTMLElement) {
    this.observer.observe(element)
  }

  unobserve(element: HTMLElement) {
    this.observer.unobserve(element)
  }

  removeListeners() {
    this.removeAllListeners(ElementScrollObserver.SCROLL_UP)
    this.removeAllListeners(ElementScrollObserver.SCROLL_UP_PRE)
    this.removeAllListeners(ElementScrollObserver.SCROLL_DOWN)
    this.removeAllListeners(ElementScrollObserver.SCROLL_DOWN_PRE)
  }

  disconnect() {
    this.observer.disconnect()
  }


}

