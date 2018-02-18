module.exports = {
  PORT: 3000,
  imagemin: {
    jpegtran: {progressive: true},
    mozjpeg: {quality: 80},
    pngquant: {quality: '70-80'}
  }
}
