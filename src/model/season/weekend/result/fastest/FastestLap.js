class FastestLap {
  constructor({ time, avgSpeed, rank, lap }) {
    this.time = time
    this.avgSpeed = avgSpeed
    this.rank = rank
    this.lap = lap
  }

  getAvgSpeed() {
    return this.avgSpeed 
     ? `${this.avgSpeed.speed} ${this.avgSpeed.units}`
     : ''
  }

  getTimeInMs() {
    const separator = /[:.]/
    const [min, sec, ms] = this.time.split(separator)
    return +min * 60000 + +sec * 1000 + +ms
  }
}

export default FastestLap
