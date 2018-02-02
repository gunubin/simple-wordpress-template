import Component from '../lib/Component'
import {TweenMax} from 'gsap'

export default class Animate extends Component {

  constructor(element) {
    super(element)

    if (this.element) {
      this.animate()
    }
  }

  animate() {
    TweenMax.to(this.element, 1, {x: 100})
  }

  loaded() {
    this.element = document.querySelector('.animate')
    console.log('loaded========================', this.element)
    TweenMax.to(this.element, 4, {x: 100, onComplete: () => {
        console.log('aaaacom')}})
  }

  mount() {
    console.log('animate mount!!!!!!!!')
  }

  unMount() {
    console.log('animate unmount!!!!!!!!')
  }

}
