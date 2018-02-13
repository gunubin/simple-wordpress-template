/* @flow */
import 'whatwg-fetch'
import Preloader from './preloader/Preloader'

const global = window
global.preloader = new Preloader()
