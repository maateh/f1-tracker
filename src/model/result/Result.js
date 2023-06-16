class Result {
  // TODO
  // Ezt a részét, ennek felépítését jobban át kéne gondolni,
  // mivel szerintem ez eléggé "egybevontnak" tűnik alapból
  // a Driver megfelelőjével.
  // -> a Drivernek vannak Resultjai, nem fordítva

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