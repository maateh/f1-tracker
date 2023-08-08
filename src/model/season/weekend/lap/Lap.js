// models
import Timing from './timing/Timing'

class Lap {
  constructor(data) {
    this.number = data.number
    this.timings = data.Timings.map(timing => new Timing(timing))
  }
}

export default Lap
