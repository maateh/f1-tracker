// model
import Standings from './Standings'

class StandingsList {
	constructor({
		year,
		round,
		drivers,
		constructors
	}) {
		this.year = year
		this.round = round
		this.drivers = drivers
		this.constructors = constructors
	}

	static parser({ data }) {
		return new StandingsList({
			year: data.season,
			round: data.round,
			drivers: this.#parseDrivers({
				driverStandings: data.DriverStandings
			}),
			constructors: this.#parseConstructors({
				constructorStandings: data.ConstructorStandings
			})
		})
	}

	static #parseDrivers({ driverStandings }) {
		if (driverStandings && driverStandings.length) {
			return driverStandings
				.map(st => Standings.parser({ data: st }))
		}
	}

	static #parseConstructors({ constructorStandings }) {
		if (constructorStandings && constructorStandings.length) {
			return constructorStandings
				.map(st => Standings.parser({ data: st }))
		}
	}
}

export default StandingsList
