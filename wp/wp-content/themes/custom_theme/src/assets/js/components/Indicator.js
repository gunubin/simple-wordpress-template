import Component from '../lib/Component'
import PreloadObserver from '../services/PreloadObserver'
import Progress from '../preloader/Progress'

export default class Indicator extends Component {

  progress: Progress
  preloadObserver: PreloadObserver

  constructor(selector) {
    super(selector)
    this.progress = window.preloader
    this.preloadObserver = PreloadObserver.create()
    this.preloadObserver.on(PreloadObserver.COMPLETE, this.preloadComplete.bind(this))
    this.preloadObserver.observe()
  }

  preloadComplete() {
    setTimeout(() => {
      this.element.classList.add('hide')
    }, 200)
  }

  fetch() {
    this.progress.reset()
    this.element.classList.remove('hide')
  }

  loaded() {
    // this.element.classList.remove('hide')
  }

}
