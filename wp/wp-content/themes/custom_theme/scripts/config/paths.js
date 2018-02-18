const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// FIXME: 階層化するか検討
module.exports = {
  src: resolveApp('src'),
  build: resolveApp('assets'),
  public: resolveApp('public'),
  sass: resolveApp('src/assets/sass'),
  mainSass: resolveApp('src/assets/sass/styles.scss'),
  css: resolveApp('assets/css'),
  imageSrc: resolveApp('src/assets/images'),
  image: resolveApp('assets/images'),
  js: {
    index: resolveApp('src/assets/js/index.js'),
    preloader: resolveApp('src/assets/js/preloader.js'),
    build: resolveApp('assets/js')
  },
  html: resolveApp('public/index.html')
};
