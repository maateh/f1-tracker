// api
import { lastRound, nextRound } from '../../../api/season'

// model
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import Results from './results/Results'
import Lap from './lap/Lap'
import PitStop from './pit/PitStop'
import QueryError from '../../error/QueryError'

class Weekend {
	constructor({
		round,
		year,
		name,
		wiki,
		date,
		time,
		circuit,
		sessions,
		results,
		laps,
		pits,
	}) {
		this.round = round
		this.year = year
		this.name = name
		this.wiki = wiki
		this.date = date
		this.time = time
		this.circuit = circuit
		this.sessions = sessions
		this.results = results
		this.laps = laps
		this.pits = pits
	}

	static async queryLast() {
		return lastRound()
			.then(({ data }) => Weekend.parser({ Race: data.Races[0] }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryNext() {
		return nextRound()
			.then(({ data }) => Weekend.parser({ Race: data.Races[0] }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static parser({ Race }) {
		return new Weekend({
			round: Race.round,
			year: Race.season,
			name: Race.raceName,
			wiki: Race.url,
			date: Race.date,
			time: Race.time,
			circuit: Circuit.parser({ Circuit: Race.Circuit }),
			sessions: SessionList.parser({ Race }),
			results: this.#parseResults({ Race }),
			laps: this.#parseLaps({ Laps: Race.Laps }),
			pits: this.#parsePits({ PitStops: Race.PitStops })
		})
	}

	static #parseResults({ Race }) {
		if (
			Race.QualifyingResults && 
			Race.QualifyingResults.length || 
			Race.Results && 
			Race.Results.length
		) {
			return Results.parser({ Race })
		}
	}

	static #parseLaps({ Laps: laps }) {
		if (laps && laps.length) {
			return laps.map(lap => Lap.parser({ Lap: lap }))
		}
	}

	static #parsePits({ PitStops: pits }) {
		if (pits && pits.length) {
			return pits.map(pit => PitStop.parser({ PitStop: pit }))
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
	
	getRelevantSession() {
		return this.sessions.relevantSession
	}
}

export default Weekend
