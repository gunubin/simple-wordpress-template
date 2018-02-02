const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const paths = require('./paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  name: 'Style',
  entry: {
    styles: paths.mainSass
  },
  output: {
    path: paths.css,
    filename: '[name].css'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['.css', '.js']
  }
}

