import foo from './components/foo'
import Hoge from './components/Hoge'
import Animate from './components/Animate'
import ready from './lib/ready'
import Pjax from './lib/Pjax'

const p = Pjax.create()
setTimeout(() => {
  p.start()
}, 0)


foo()

const seq = async () => {
  await ready()

  const p = document.createElement('p')
  // const foo = document.querySelector('.foo')
  const hoge = new Hoge(p)

  const a = document.querySelector('.animate')
  console.log(a, p)
  const animate = new Animate(a)

  const container = document.querySelector('.wrapper')

  setTimeout(() => {
    container.appendChild(p)
    // container.appendChild(a)
    // console.log(a)
    if (a && a.parentElement) {
      a.parentElement.removeChild(a)
      // container.removeChild(a)
    }
    //
    setTimeout(() => {
      container.removeChild(p)
    }, 500)
    //
  }, 1000)

}

seq()


