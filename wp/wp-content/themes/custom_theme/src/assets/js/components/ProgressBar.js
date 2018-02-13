/* @flow */
import ProgressObserver from '../lib/ProgressObserver'
import {TweenMax} from 'gsap'

export default class ProgressBar {

  constructor(selector: string) {
    this.element = document.querySelector(selector)
    this.progressObserver = ProgressObserver.create()
    this.progressObserver.on(ProgressObserver.PROGRESS, this.progress.bind(this))
    this.progressObserver.on(ProgressObserver.COMPLETE, this.completeProgress.bind(this))
  }

  progress(loaded: number) {
    console.log('ProgressBar.progress', loaded)
    TweenMax.fromTo(this.element, 0.2, {opacity: 1, width: '0%'}, {width: `${loaded*100}%`})
  }

  completeProgress() {
    console.log('ProgressBar.complete')
    TweenMax.to(this.element, 0.8, {opacity: 0})
  }

}
