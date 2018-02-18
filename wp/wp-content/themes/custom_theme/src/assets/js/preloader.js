/* @flow */
import './preloader/polyfill'
import Progress from './preloader/Progress'
window.preloader = new Progress('.progress-bar', config.preloadSelector)
