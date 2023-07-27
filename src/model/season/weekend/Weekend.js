// api
import { lastRound, nextRound } from '../../../api/season'

// model
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import Result from './result/Result'
import QueryError from '../../error/QueryError'
import { format } from 'date-fns'

class Weekend {
	constructor(data) {
		this.round = data.round
		this.year = data.season

		this.name = data.raceName
		this.wikiUrl = data.url
		this.circuit = new Circuit(data.Circuit)

		this.date = data.date
		this.time = data.time

		this.parseSessions(data)
		this.parseResult(data)
	}

	static async queryLast() {
		return lastRound()
			.then(data => new Weekend(data.Races[0]))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryNext() {
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
		if (
			data.QualifyingResults && 
			data.QualifyingResults.length || 
			data.Results && 
			data.Results.length
		) {
			this.result = new Result(data)
		}
	}

	get active() {
		return this.sessions.practices[0].start < Date.now()
	}

	getFormattedDate(pattern) {
		const date = new Date(`${this.date}`)
		return format(date, pattern)
	}
}

export default Weekend
