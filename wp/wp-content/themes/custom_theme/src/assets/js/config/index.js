/* @flow */
export type ConfigType = {
  jsRelativeUrl: string,
  maxConnections: number,
  mediaQuery: Object,
  pageTransitionContainer: string,
  preloadSelector: string
}

const baseConfig: ConfigType = {
  jsRelativeUrl: '',
  maxConnections: 3,
  mediaQuery: {
    xs: 'screen and (max-width: 767px)',
    sm: 'screen and (min-width: 768px) and (max-width: 1024px)',
    md: 'screen and (min-width: 1025px) and (max-width: 1180px)',
    lg: 'screen and (min-width: 1181px)'
  },
  pageTransitionContainer: '#page-transition',
  preloadSelector: '.js-preload'
}

const configure = () => {
  window.config = {...baseConfig, ...window.config}
}

export {
  configure
}
