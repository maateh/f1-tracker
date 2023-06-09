import ResultList from "./ResultList"

class Result {
  constructor(data) {
    this.number = data.number
    this.position = data.position
    this.points = data.points
    
    
    this.grid = data.grid
    this.laps = data.laps
    this.status = data.status
    this.driver = data.Driver
    this.constructor = data.Constructor
    this.time = data.Time
    this.fastestLap = data.FastestLap
  }
}

export default Result