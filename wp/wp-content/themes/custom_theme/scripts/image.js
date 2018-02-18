const project = require('./config/project')
const paths = require('./config/paths')
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

imagemin([`${paths.imageSrc}/**/*.{jpg,jpeg,png}`], `${paths.image}`, {
  plugins: [
    imageminJpegtran(project.imagemin.jpegtran), // progressiveの方が僅かに小さい
    imageminMozjpeg(project.imagemin.mozjpeg),
    imageminPngquant(project.imagemin.pngquant)
  ]
}).then(files => {
  // console.log(files);
});
