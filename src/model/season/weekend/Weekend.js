// api
import { nextRound } from '../../../api/season'

// model
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import Result from './result/Result'
import QueryError from '../../error/QueryError'

class Weekend {
	constructor(data) {
		this.round = data.round
		this.year = data.season

		this.name = data.raceName
		this.wikiUrl = data.url
		this.circuit = new Circuit(data.Circuit)

		this.parseSessions(data)
		this.parseResult(data)
	}

	static async query() {
		return nextRound()
			.then(data => new Weekend(data.Races[0]))
			.catch(err => {
				throw new QueryError(err.message)
			})
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

	parseResult(data) {
		if (data.QualifyingResults || data.Results) {
			this.result = new Result(data)
		}
	}

	get active() {
		return this.sessions.practices[0].start < Date.now()
	}
}

export default Weekend
