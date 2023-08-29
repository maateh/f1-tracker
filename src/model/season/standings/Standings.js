// models
import Driver from '../weekend/results/driver/Driver'
import Constructor from '../weekend/results/constructor/Constructor'

class Standings {
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

  static parser({ Standings: standings }) {
    return new Standings({
      position: standings.position,
      points: standings.points,
      wins: standings.wins,
      driver: this.#parseDriver({ Driver: standings.Driver }),
      constructor: this.#parseConstructors({ Constructor: standings.Constructor }),
      constructors: this.#parseConstructors({ Constructors: standings.Constructors })
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

export default Standings
