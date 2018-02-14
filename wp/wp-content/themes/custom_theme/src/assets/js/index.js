import {TweenLite} from 'gsap'
import Animate from './components/Animate'
import {domLoaded} from './lib/promisfy'
import Mediaquery from './services/Mediaquery'
import PageTransition from './services/PageTransition'
import {configure} from './config'
import ImagePreloadObserver from './services/ImagePreloadObserver'
import DebugMode, {DEBUG_MODE} from './services/DebugMode'

const applicationSequence = async () => {

  // 非アクティブ時からフォーカスした際のアニメーションを修正
  TweenLite.lagSmoothing(0);

  configure()

  await domLoaded()

  const debugMode = DebugMode.getMode()
  if (debugMode === DEBUG_MODE.development) {
    DebugMode.render(debugMode)
  }

  PageTransition.create().start(config.pageTransitionContainer)

  Mediaquery.create(config.mediaQuery)

  const imagePreloadObserve = new ImagePreloadObserver()
  imagePreloadObserve.observe()

  const animate = new Animate('.animate')
}

applicationSequence()
