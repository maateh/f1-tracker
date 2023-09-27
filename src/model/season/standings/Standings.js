// model
import StandingsResult from './StandingsResult'

class Standings {
	constructor({ year, round, drivers, constructors }) {
		this.year = year
		this.round = round
		this.drivers = drivers
		this.constructors = constructors
	}
	
	static parseList({ StandingsLists: standingsList }) {
    if (standingsList && standingsList.length) {
      return standingsList.map(standings => this.parser({ StandingsList: standings }))
    }
	}

	static parser({ StandingsList: standings }) {
		return new Standings({
			year: standings.season,
			round: standings.round,
			drivers: this.parseDrivers({
				DriverStandings: standings.DriverStandings,
			}),
			constructors: this.parseConstructors({
				ConstructorStandings: standings.ConstructorStandings,
			}),
		})
	}

	static parseDrivers({ DriverStandings: standings }) {
		if (standings && standings.length) {
			return standings.map(result =>
				StandingsResult.parser({ StandingsResult: result })
			)
		}
	}

	static parseConstructors({ ConstructorStandings: standings }) {
		if (standings && standings.length) {
			return standings.map(result =>
				StandingsResult.parser({ StandingsResult: result })
			)
		}
	}
}

export default Standings
