// models
import Driver from '../weekend/results/driver/Driver'
import Constructor from '../weekend/results/constructor/Constructor'

class StandingsResult {
	constructor({
    position,
    points,
    wins,
    driver,
    constructor,
    constructors
  }) {
		this.position = position
		this.points = points
		this.wins = wins
    this.driver = driver
    this.constructor = constructor
    this.constructors = constructors
	}

  static parser({ StandingsResult: result }) {
    return new StandingsResult({
      position: result.position,
      points: result.points,
      wins: result.wins,
      driver: this.#parseDriver({ Driver: result.Driver }),
      constructor: this.#parseConstructors({ Constructor: result.Constructor }),
      constructors: this.#parseConstructors({ Constructors: result.Constructors })
    })
  }

	static #parseDriver({ Driver: driver }) {
		if (driver) {
			return Driver.parser({ Driver: driver })
		}
	}

	static #parseConstructors({ Constructors: constructors, Constructor: constructor }) {
		if (constructors && constructors.length) {
			return constructors.map(c => Constructor.parser({ Constructor: c }))
		}

		if (constructor) {
			return Constructor.parser({ Constructor: constructor })
		}
	}
}

export default StandingsResult
