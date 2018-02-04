import foo from './components/foo'
import Hoge from './components/Hoge'
import Animate from './components/Animate'
import ready from './lib/ready'
import Pjax from './services/Pjax'

const p = Pjax.create()
setTimeout(() => {
  p.start()
}, 0)


foo()

const seq = async () => {
  await ready()

  const p = document.createElement('p')
  p.className = 'aa'
  p.textContent = 'pppppppppppppppppppppppppppppppppppppppp'
  const foo = document.querySelector('.foo')
  // const hoge = new Hoge(foo)
  const pppp = new Hoge(() => p)

  const animate = new Animate('.animate')
    // const container = document.querySelector('#barba-wrapper')
    // console.log(container)
    // animate.attach(a, container)

  const container = document.querySelector('.foo')
  // const container = document.body

  setTimeout(() => {
    container.appendChild(p)
    // container.appendChild(a)
    // console.log(a)
    //
    setTimeout(() => {
      container.removeChild(p)
    }, 500)
    //
  }, 1000)

}

seq()


