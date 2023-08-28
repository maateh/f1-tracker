// models
import Timing from './timing/Timing'

class Lap {
  constructor({ number, timings }) {
    this.number = number
    this.timings = timings
  }

  static parser({ Lap: lap }) {
    return new Lap({
      number: lap.number,
      timings: lap.Timings.map(t => Timing.parser({ Timing: t }))
    })
  }
}

export default Lap
