// model
import Driver from "../driver/Driver"
import Constructor from "../constructor/Constructor"
import ParseError from "../../../../error/ParseError"

class Qualifying {
  constructor({
    number,
    position,
    q1,
    q2,
    q3,
    driver,
    constructor
  }) {
    this.number = number
    this.position = position
    this.q1 = q1
    this.q2 = q2
    this.q3 = q3
    this.driver = driver
    this.constructor = constructor
  }

  static parser({ QualifyingResult: result }) {
    try {
      return new Qualifying({
        number: result.number,
        position: result.position,
        q1: result.Q1 || '-',
        q2: result.Q2 || '-',
        q3: result.Q3 || '-',
        driver: Driver.parser({ Driver: result.Driver }),
        constructor: Constructor.parser({ Constructor: result.Constructor })
      })
    } catch (err) {
      throw new ParseError(err.message)
    }
  }

  get time() {
    return this.q3 !== '-' ? this.q3 : this.q2 !== '-' ? this.q2 : this.q1
  }
}

export default Qualifying