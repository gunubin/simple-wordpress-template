import Component from '../lib/Component'

export default class Hoge extends Component {


  mount() {
    console.log('mount!!!!!!!!')
  }

  unMount() {
    console.log('unmount!!!!!!!!')
  }

  mountDocument() {
    console.log(' mount document!!!!!!!!')
  }

  unMountDocument() {
    console.log(' unmount document!!!!!!!!')
  }

}
