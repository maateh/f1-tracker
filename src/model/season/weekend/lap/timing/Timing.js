class Timing {
  constructor(data) {
    this.driverId = data.driverId
    this.position = data.position
    this.time = data.time
  }

  getTimeInMs() {
    const separator = /[:.]/
    const [min, sec, ms] = this.time.split(separator)
    return +min * 60000 + +sec * 1000 + +ms
  }
}

export default Timing
