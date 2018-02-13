/* @flow */
import Progress from './preloader/Progress'

const global = window
global.preloader = new Progress()
