const webpack = require('webpack')
const config = require('./config/webpack.dev')
const configSass = require('./config/webpack.sass.dev')
const statsConfig = require('./config/stats')
const logger = require('./lib/logger')

const compiler = webpack([config, configSass])

compiler.watch({
  ignored: 'node_modules'
}, (err, stats) => {
  if (err) {
    logger.log(err)
    return
  }
  logger.log(stats.toString(
    Object.assign(
      statsConfig,
      {modules: false}
    )
  ))
})
