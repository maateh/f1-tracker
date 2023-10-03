// models
import ParseError from "../../../error/ParseError"

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

  static MAX_GAP = 240000

  static parser({ PitStop: pit }) {
    try {
      return new PitStop({
        driverId: pit.driverId,
        lap: pit.lap,
        stop: pit.stop,
        time: pit.time,
        duration: pit.duration
      })
    } catch (err) {
      throw new ParseError(err.message)
    }
  }

  getDurationInMs() {
    const separator = /[:.]/    
    const times = this.duration.split(separator)

    return times.length === 2
      ? +times[0] * 1000 + +times[1]
      : times.length === 3
      ? +times[0] * 60000 + +times[1] * 1000 + +times[2]
      : 0
  }
}

export default PitStop
