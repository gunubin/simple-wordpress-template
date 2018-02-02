const paths = require('./paths')
const staticAssetName = 'static/media/[hash:8].[ext]'

module.exports = {
  name: 'Javascript',
  resolve: {
    modules: ['node_modules', paths.src],
    extensions: ['.js']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
      },
    ]
  }
}


