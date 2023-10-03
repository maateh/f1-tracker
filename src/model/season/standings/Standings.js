// model
import StandingsResult from './StandingsResult'
import ParseError from '../../error/ParseError'

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
		try {
			return new Standings({
				year: standings.season,
				round: standings.round,
				drivers: this.parseDrivers({
					DriverStandings: standings.DriverStandings,
				}),
				constructors: this.parseConstructors({
					ConstructorStandings: standings.ConstructorStandings,
				})
			})
		} catch (err) {
			throw new ParseError(err.message)
		}
	}

	static parseDrivers({ DriverStandings: standings }) {
		try {
			if (standings && standings.length) {
				return standings.map(result => {
					return StandingsResult.parser({ StandingsResult: result })
				})
			}
		} catch (err) {
			throw new ParseError(err.message)
		}
	}

	static parseConstructors({ ConstructorStandings: standings }) {
		try {
			if (standings && standings.length) {
				return standings.map(result => {
					return StandingsResult.parser({ StandingsResult: result })
				})
			}
		} catch (err) {
			throw new ParseError(err.message)
		}
	}
}

export default Standings
