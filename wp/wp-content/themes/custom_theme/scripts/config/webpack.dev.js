const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const paths = require('./paths')

module.exports =
  merge.smart(
    common,
    {
      cache: true,
      devtool: 'heap-module-eval-source-map',
      entry: {
        app: [
          "babel-polyfill",
          paths.js.index
        ]
      },
      output: {
        path: paths.js.build,
        filename: 'app.js',
        publicPath: '/'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.BROWSER': true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ],
    }
  )

