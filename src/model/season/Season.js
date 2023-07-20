// api
import { season } from '../../api/season'

// model
import Weekend from './weekend/Weekend'
import QueryError from '../error/QueryError'
import StandingsLists from './standings/StandingsList'
import Driver from './weekend/result/driver/Driver'

class Season {
	constructor(data) {
		this.year = data.season
		this.parseWiki(data)
		this.parseWeekends(data)
		this.parseStandings(data)
		this.parseDrivers(data)
		this.parseConstructors(data)
	}

	static async query(year) {
		return season(year)
			.then(data => new Season(data))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	parseWiki(data) {
		if (data.url) {
			this.wiki = data.url
		}
	}

	parseWeekends(data) {
		if (data.Races && data.Races.length) {
		  this.weekends = data.Races.map(weekend => new Weekend(weekend))
		}
	}

	parseStandings(data) {
    if (data.StandingsLists && data.StandingsLists.length) {
      this.standings = new StandingsLists(data.StandingsLists[0])
    }
	}

	parseDrivers(data) {
		if (data.Drivers && data.Drivers.length) {
			this.drivers = data.Drivers.map(driver => new Driver(driver))
		}
	}

	parseConstructors(data) {
		if (data.Constructors && data.Constructors.length) {
			this.constructors = data.Constructors.map(constructor => new Driver(constructor))
		}
	}
}

export default Season
