// model
import Standings from './Standings'

class StandingsList {
	constructor({ year, round, drivers, constructors }) {
		this.year = year
		this.round = round
		this.drivers = drivers
		this.constructors = constructors
	}

	static parser({ StandingsList: standingsList }) {
		return new StandingsList({
			year: standingsList.season,
			round: standingsList.round,
			drivers: this.#parseDrivers({
				DriverStandings: standingsList.DriverStandings,
			}),
			constructors: this.#parseConstructors({
				ConstructorStandings: standingsList.ConstructorStandings,
			}),
		})
	}

	static #parseDrivers({ DriverStandings: driverStandings }) {
		if (driverStandings && driverStandings.length) {
			return driverStandings.map(standings =>
				Standings.parser({ Standings: standings })
			)
		}
	}

	static #parseConstructors({ ConstructorStandings: constructorStandings }) {
		if (constructorStandings && constructorStandings.length) {
			return constructorStandings.map(standings =>
				Standings.parser({ Standings: standings })
			)
		}
	}
}

export default StandingsList
