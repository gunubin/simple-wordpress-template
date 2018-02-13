import Animate from './components/Animate'
import ready from './lib/ready'
import Mediaquery from './services/Mediaquery'
import PageTransition from './services/PageTransition'
import ImageLoader from './preloader/ImageLoader'

const seq = async () => {

  await ready()

  const pt = PageTransition.create()
  pt.start()

  const mq = Mediaquery.create({
    xs: 'screen and (max-width: 767px)',
    sm: 'screen and (min-width: 768px) and (max-width: 1024px)',
    md: 'screen and (min-width: 1025px) and (max-width: 1180px)',
    lg: 'screen and (min-width: 1181px)'
  })

  const preloaderAttacher = new ImageLoader()

  mq.addListener(Mediaquery.CHANGE, mq => {
    // console.log(mq)
  })

  const animate = new Animate('.animate')

  const container = document.querySelector('.foo')
  // const container = document.body
  // const progressBar = new ProgressBar('.progress-bar')


}

seq()


