// models
import ParseError from "../../../../error/ParseError"

class Timing {
  constructor({ driverId, position, time }) {
    this.driverId = driverId
    this.position = position
    this.time = time
  }

  static parser({ Timing: timing }) {
    try {
      return new Timing({
        driverId: timing.driverId,
        position: timing.position,
        time: timing.time
      })
    } catch (err) {
      throw new ParseError(err.message)
    }
  }

  getTimeInMs() {
    const separator = /[:.]/
    const [min, sec, ms] = this.time.split(separator)
    return +min * 60000 + +sec * 1000 + +ms
  }
}

export default Timing
