import Constructor from "../season/weekend/result/constructor/Constructor"
import Driver from "../season/weekend/result/driver/Driver"

class Standings {
  constructor(data) {
    this.position = data.position
    this.points = data.points
    this.wins = data.wins
    
    this.parseDriver(data)
    this.parseConstructors(data)
  }

  parseDriver(data) {
    if (data.Driver) {
      this.driver = new Driver(data.Driver)
    }
  }

  parseConstructors(data) {
    if (data.Constructors) {
      this.constructors = data.Constructors.map(c => new Constructor(c))
    }

    if (data.Constructor) {
      this.constructor = new Constructor(data.Constructor)
    }
  }
}