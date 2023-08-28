class Timing {
  constructor({ driverId, position, time }) {
    this.driverId = driverId
    this.position = position
    this.time = time
  }

  static parser({ Timing: timing }) {
    return new Timing({
      driverId: timing.driverId,
      position: timing.position,
      time: timing.time
    })
  }

  getTimeInMs() {
    const separator = /[:.]/
    const [min, sec, ms] = this.time.split(separator)
    return +min * 60000 + +sec * 1000 + +ms
  }
}

export default Timing
