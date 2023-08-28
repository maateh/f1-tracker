class PitStop {
  constructor({
    driverId,
    lap,
    stop,
    time,
    duration
  }) {
    this.driverId = driverId
    this.lap = lap
    this.stop = stop
    this.time = time
    this.duration = duration
  }

  static parser({ PitStop: pit }) {
    return new PitStop({
      driverId: pit.driverId,
      lap: pit.lap,
      stop: pit.stop,
      time: pit.time,
      duration: pit.duration
    })
  }

  getDurationInMs() {
    const separator = /[.]/
    const [sec, ms] = this.duration.split(separator)
    return +sec * 1000 + +ms
  }
}

export default PitStop
