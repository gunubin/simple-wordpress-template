/* @flow */
import Utils from '../lib/Utils'

export const DEBUG_MODE = {
  development: '1',
  production: '0',
}

type DebugModeType = $Values<typeof DEBUG_MODE>

export default class DebugMode {

  static getMode(): DebugModeType {
    let mode = DEBUG_MODE.production
    if (process.env.NODE_ENV === 'development') {
      const Cookie = require('es-cookie')
      const d = Utils.getParams('d')
      if (d) {
        Cookie.set('debug-mode', d, {path: '/'})
      }
      mode = Cookie.get('debug-mode') || d
      return mode || DEBUG_MODE.production
    }
    return mode
  }

  static render() {
    const mode = DebugMode.getMode()
    if (mode === DEBUG_MODE.production) {
      return
    }
    const notice = document.createElement('div')
    const modeName = Object.keys(DEBUG_MODE).find(m => DEBUG_MODE[m] === mode) || ''
    notice.textContent = `Debug Mode: ${modeName}`
    Object.assign(notice.style, {
      padding: '0.2em 0.5em',
      position: 'fixed',
      left: '0',
      bottom: '0',
      color: '#333',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      cursor: 'default',
      transition: '0.2s ease'
    })
    document.body && document.body.appendChild(notice)
    notice.addEventListener('mouseenter', () => notice.style.opacity = '0')
    notice.addEventListener('mouseleave', () => notice.style.opacity = '1')
  }

}
