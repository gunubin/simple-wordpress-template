const paths = require('./config/paths')
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

imagemin([`${paths.imageSrc}/*.{jpg,jpeg,png}`], `${paths.image}`, {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({quality: '65-80'})
  ]
}).then(files => {
  console.log(files);
});