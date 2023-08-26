class PitStop {
  constructor(data) {
    this.driverId = data.driverId
    this.lap = data.lap
    this.stop = data.stop
    this.time = data.time
    this.duration = data.duration
  }

  getDurationInMs() {
    const separator = /[.]/
    const [sec, ms] = this.duration.split(separator)
    return +sec * 1000 + +ms
  }
}

export default PitStop
