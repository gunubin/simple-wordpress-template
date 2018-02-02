const timelinePromise = (timeline) => {
  return new Promise(resolve => {
    timeline.eventCallback("onComplete", function () {
      resolve(true)
    })
  })
}

export default timelinePromise
