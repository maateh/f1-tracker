// model
import Standings from './Standings'

class StandingsLists {
	constructor(data) {
		this.rounds = data.round
		this.parseDrivers(data)
		this.parseConstructors(data)
	}

	parseDrivers(data) {
		if (data.DriverStandings) {
			this.drivers = data.DriverStandings.map(st => new Standings(st))
		}
	}

	parseConstructors(data) {
		if (data.ConstructorStandings) {
			this.constructors = data.ConstructorStandings.map(st => new Standings(st))
		}
	}
}

export default StandingsLists
