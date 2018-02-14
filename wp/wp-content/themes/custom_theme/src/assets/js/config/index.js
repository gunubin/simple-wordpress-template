/* @flow */
export type Config = {
  jsRelativeUrl: string,
  mediaQuery: Object,
  pageTransitionContainer: string
}

const baseConfig: Config = {
  jsRelativeUrl: '',
  mediaQuery: {
    xs: 'screen and (max-width: 767px)',
    sm: 'screen and (min-width: 768px) and (max-width: 1024px)',
    md: 'screen and (min-width: 1025px) and (max-width: 1180px)',
    lg: 'screen and (min-width: 1181px)'
  },
  pageTransitionContainer: '#page-transition'
}

const configure = () => {
  window.config = {...baseConfig, ...window.config}
}

export {
  configure
}
