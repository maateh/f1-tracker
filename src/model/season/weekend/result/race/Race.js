// model
import Constructor from "../constructor/Constructor"
import Driver from "../driver/Driver"

class Race {
  constructor(data) {
    this.number = data.number
    this.position = data.position
    this.points = data.points
    this.grid = data.grid
    this.laps = data.laps
    this.status = data.status
    
    this.raceTime = data.Time
    this.fastestLap = data.FastestLap
    
    this.driver = new Driver(data.Driver)
    this.constructor = new Constructor(data.Constructor)
  }
}

export default Race