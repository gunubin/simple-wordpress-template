import {TweenLite} from 'gsap'
import Animate from './components/Animate'
import {domLoaded} from './lib/promisfy'
import Mediaquery from './services/Mediaquery'
import PageTransition from './services/PageTransition'
import {configure} from './config'
import PreloadAttachment from './services/PreloadAttachment'
import DebugMode from './services/DebugMode'
import Indicator from './components/Indicator'
import ComponentGenerator from './lib/ComponentGenerator'

const applicationSequence = async () => {

  // 非アクティブ時からフォーカスした際のアニメーションを修正
  TweenLite.lagSmoothing(0)

  configure()

  await domLoaded()

  DebugMode.render()

  PageTransition.create().start(config.pageTransitionContainer)

  Mediaquery.create(config.mediaQuery)

  const preloadAttachment = new PreloadAttachment(config.preloadSelector)

  new ComponentGenerator({
    '.animate': Animate,
    '.progress': Indicator,
  })

}

applicationSequence()
