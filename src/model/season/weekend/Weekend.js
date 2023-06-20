// api
import { fetchData } from '../../../api/fetchData'

// model
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import ResultList from '../../result/ResultList'

class Weekend {
	constructor(data) {
		this.round = data.round
		this.year = data.season

		this.name = data.raceName
		this.wikiUrl = data.url
		this.circuit = new Circuit(data.Circuit)

		this.parseSessions(data)
		this.parseResults(data)
	}

	static async fetch(url) {
		return fetchData(url, 'RaceTable')
			.then(data => new Weekend(data.Races[0]))
			.catch(err => {
				throw new Error(err)
			})
	}

	get active() {
		return this.sessions.practices[0].start < Date.now()
	}

	parseSessions(data) {
		if (
			data.FirstPractice &&
			data.SecondPractice &&
			(data.ThirdPractice || data.Sprint) &&
			data.Qualifying &&
			data.date &&
			data.time
		) {
			this.sessions = new SessionList(data)
		}
	}

	parseResults(data) {
		if (data.Results) {
			this.results = new ResultList(data)
		}
	}
}

export default Weekend
