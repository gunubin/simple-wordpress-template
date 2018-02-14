/* @flow */
export type Config = {
  jsRelativePath: string
}

const config: Config = {
  jsRelativePath: ''
}

const configure = () => {
  window.config = window.config || config
}

export {
  configure
}
