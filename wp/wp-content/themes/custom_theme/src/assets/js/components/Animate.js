/* @flow */
import Component from '../lib/Component'
import type {Selector} from '../lib/Component'
import {TweenMax, Sine} from 'gsap'
import Observer from '../lib/ElementScrollObserver'

export default class Animate extends Component {

  constructor(selector: Selector) {
    super(selector)

  }
  
  _init() {
    this.ob = new Observer(0, 0.10)
    const obs = [...document.querySelectorAll('.ob')].map((e) => {
      this.ob.observe(e)
    })
    this.ob.on(Observer.SCROLL_UP, (e: HTMLElement) => {
      TweenMax.to(e.querySelector('.ob-inner'), 0.6, {ease: Sine.easeInOut, y: '0%'})
    })
    this.ob.on(Observer.SCROLL_DOWN, (e: HTMLElement) => {
      TweenMax.to(e.querySelector('.ob-inner'), 0.6, {ease: Sine.easeInOut, y: '0%'})
    })

    this.ob.on(Observer.SCROLL_UP_PRE, (e: HTMLElement) => {
      TweenMax.set(e.querySelector('.ob-inner'), {y: '50%'})
    })
    this.ob.on(Observer.SCROLL_DOWN_PRE, (e: HTMLElement) => {
      TweenMax.set(e.querySelector('.ob-inner'), {y: '-50%'})
    })
  }

  ready() {
    TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
    this._init()
  }
  
  fetch(old) {
    this.ob.disconnect()
  }

  loaded() {
    this._init()
  }

  mount() {
    TweenMax.to(this.element, 4, {x: -100, onComplete: () => {}})
    // TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
  }

  unMount() {
    console.log('animate unmount!!!!!!!!')
  }

  complete() {
  }

}
