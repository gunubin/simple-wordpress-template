const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const paths = require('./paths')

module.exports =
  merge.smart(
    common,
    {
      devtool: 'source-map',
      entry: {
        app: [
          require.resolve('./polyfills'),
          // "babel-polyfill",
          paths.js.index
        ],
        preloader: [
          require.resolve('./polyfills'),
          paths.js.preloader
        ]
      },
      output: {
        path: paths.js.build,
        filename: '[name].js',
        publicPath: '/'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env.BROWSER': true,
        }),
        // Decrease script evaluation time
        // https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
        new webpack.optimize.ModuleConcatenationPlugin(),
        // Minimize all JavaScript output of chunks
        // https://github.com/mishoo/UglifyJS2#compressor-options
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        }),
        new webpack.HashedModuleIdsPlugin(),
      ],
    }
  )

