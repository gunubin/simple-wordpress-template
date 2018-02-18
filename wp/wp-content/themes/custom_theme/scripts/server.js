const bs = require('browser-sync').create()
const paths = require('./config/paths')
const {PORT} = require('./config/project')

bs.init({
  // server: {
  //   baseDir: `${paths.build}`
  // },
  // port: PORT || 3000,
  proxy: 'http://swt.localhost',
  open: false,
  notify: false,
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: function (snippet, match) {
        return snippet + match
      }
    }
  },
})

bs.watch(`${paths.build}/**/*.*`).on('change', file => {
  bs.reload(file)
})

// php or twig
bs.watch(`**/*.(php|twig)`).on('change', file => {
  bs.reload(file)
})
