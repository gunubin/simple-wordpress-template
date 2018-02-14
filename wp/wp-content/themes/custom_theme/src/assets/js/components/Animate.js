import Component from '../lib/Component'
import {TweenMax, Sine} from 'gsap'
import Observer from '../services/ViewportObserver'

export default class Animate extends Component {

  constructor(selector) {
    super(selector)

    this.ob = new Observer(0, 0.10)
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


    if (this.element) {
      TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
    }
    this._init()
  }

  _init() {
    const obs = [...document.querySelectorAll('.ob')].map((e) => {
      this. ob && this.ob.observe(e)
    })
  }

  ready() {
  }
  
  fetch() {
    this.ob && this.ob.disconnect()
  }

  loaded() {
    this._init()
  }

  mount() {
    console.log(this.element)
    TweenMax.to(this.element, 4, {x: -100, onComplete: () => {}})
    // TweenMax.to(this.element, 4, {x: 100, onComplete: () => {}})
  }

  unMount() {
  }

  complete() {
  }

}
