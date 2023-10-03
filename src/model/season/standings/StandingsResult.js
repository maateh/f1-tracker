// models
import Driver from '../weekend/results/driver/Driver'
import Constructor from '../weekend/results/constructor/Constructor'
import ParseError from '../../error/ParseError'

class StandingsResult {
	constructor({
    position,
    points,
    wins,
    driver,
    constructors,
    constructor
  }) {
		this.position = position
		this.points = points
		this.wins = wins
    this.driver = driver
    this.constructors = constructors
    this.constructor = constructor
	}

  static parser({ StandingsResult: result }) {
    try {
      return new StandingsResult({
        position: result.position,
        points: result.points,
        wins: result.wins,
        driver: this.#parseDriver({ Driver: result.Driver }),
        constructors: this.#parseConstructors({ Constructors: result.Constructors }),
        constructor: this.#parseConstructor({ Constructor: result.Constructor })
      })
    } catch (err) {
      throw new ParseError(err.message)
    }
  }

  static #parseDriver({ Driver: driver }) {
		if (driver) {
			return Driver.parser({ Driver: driver })
		}
	}

	static #parseConstructors({ Constructors: constructors }) {
		if (constructors && constructors.length) {
			return constructors.map(c => Constructor.parser({ Constructor: c }))
		}
	}

  static #parseConstructor({ Constructor: constructor }) {
		if (constructor) {
			return Constructor.parser({ Constructor: constructor })
		}
	}
}

export default StandingsResult
