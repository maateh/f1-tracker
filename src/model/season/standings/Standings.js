// models
import Driver from '../weekend/result/driver/Driver'
import Constructor from '../weekend/result/constructor/Constructor'

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

  static parser({ data }) {
    return new Standings({
      position: data.position,
      points: data.points,
      wins: data.wins,
      driver: this.#parseDriver({ driver: data.Driver }),
      constructor: this.#parseConstructors({ constructor: data.Constructor }),
      constructors: this.#parseConstructors({ constructors: data.Constructors })
    })
  }

	static #parseDriver({ driver }) {
		if (driver) {
			return new Driver(driver)
		}
	}

	static #parseConstructors({ constructors, constructor }) {
		if (constructors && constructors.length) {
			return constructors.map(c => new Constructor(c))
		}

		if (constructor) {
			return new Constructor(constructor)
		}
	}
}

export default Standings
