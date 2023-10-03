// models
import Timing from './timing/Timing'
import ParseError from '../../../error/ParseError'

class Lap {
  constructor({ number, timings }) {
    this.number = number
    this.timings = timings
  }

  static parser({ Lap: lap }) {
    try {
      return new Lap({
        number: lap.number,
        timings: lap.Timings.map(t => Timing.parser({ Timing: t }))
      })
    } catch (err) {
      throw new ParseError(err.message)      
    }
  }
}

export default Lap
