// api
import { lastRound, nextRound } from '../../../api/season'

// model
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import Result from './result/Result'
import Lap from './lap/Lap'
import PitStop from './pit/PitStop'
import QueryError from '../../error/QueryError'

class Weekend {
	constructor(data) {
		this.round = data.round
		this.year = data.season

		this.name = data.raceName
		this.wikiUrl = data.url
		this.circuit = new Circuit(data.Circuit)

		this.date = data.date
		this.time = data.time

		this.sessions = new SessionList(data)
		this.parseResult(data)
		this.parseLaps(data)
		this.parsePits(data)
	}

	static async queryLast() {
		return lastRound()
			.then(({ data }) => new Weekend(data.Races[0]))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryNext() {
		return nextRound()
			.then(({ data }) => new Weekend(data.Races[0]))
			.catch(err => {
				throw new QueryError(err.message)
			})
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

	parseLaps(data) {
		if (
			data.Laps &&
			data.Laps.length
		) {
			this.laps = data.Laps.map(lap => new Lap(lap))
		}
	}

	parsePits(data) {
		if (
			data.PitStops &&
			data.PitStops.length
		) {
			this.pits = data.PitStops.map(pit => new PitStop(pit))
		}
	}

	isActive() {
		const now = Date.now()
		return this.sessions.practices && 
			this.sessions.practices[0]?.start < now
			&& this.sessions.race.end > now
	}

	isOver() {
		return this.sessions.race.isOver()
	}

	isRemaining() {
		return !this.isActive() && !this.isOver()
	}
}

export default Weekend
