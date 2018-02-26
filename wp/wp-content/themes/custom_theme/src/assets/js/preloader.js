/* @flow */
import Progress from './preloader/Progress'
import {configure} from './config';
configure();
window.preloader = new Progress('.progress-bar', config.preloadSelector)
