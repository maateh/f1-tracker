// api
import { season } from '../../api/season'

// model
import Weekend from './weekend/Weekend'
import QueryError from '../error/QueryError'
import StandingsLists from './standings/StandingsList'

class Season {
	constructor(data) {
		this.year = data.season
		this.parseWiki(data)
		this.parseWeekends(data)
		this.parseStandings(data)
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
		if (data.Races) {
		  this.weekends = data.Races.map(weekend => new Weekend(weekend))
		}
	}

	parseStandings(data) {
    if (data.StandingsLists) {
      this.standings = new StandingsLists(data.StandingsLists[0])
    }
	}
}

export default Season
