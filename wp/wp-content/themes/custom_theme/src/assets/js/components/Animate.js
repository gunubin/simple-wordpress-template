/* @flow */
import Component from '../lib/Component'
import type {Selector} from '../lib/Component'
import {TweenMax} from 'gsap'

export default class Animate extends Component {

  constructor(selector: Selector) {
    super(selector)

  }

  // loaded(newContainer, oldContainer) {
  //   super.loaded(newContainer, oldContainer)
    // this.element = document.querySelector('.animate')
  // }
  ready() {
    TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
  }

  mount() {
    TweenMax.to(this.element, 4, {x: -100, onComplete: () => {}})
    console.log('animate mount!!!!!!!!')
    // TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
  }

  unMount() {
    console.log('animate unmount!!!!!!!!')
  }

  complete() {
  }

  mountDocument() {
    console.log('animate mount document!!!!!!!!')
  }

  unMountDocument() {
    console.log('animate unmount document!!!!!!!!')
  }

}
