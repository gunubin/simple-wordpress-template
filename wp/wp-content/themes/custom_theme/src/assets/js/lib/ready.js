const ready = () => new Promise(resolve => {
  if (document.readyState === "complete") {
    setImmediate(() => resolve())
    return
  }
  window.addEventListener('load', function () {
    resolve()
  })
  document.addEventListener('DOMContentLoaded', function () {
    resolve()
  })
})

export default ready
