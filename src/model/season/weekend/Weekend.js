// models
import Circuit from './circuit/Circuit'
import SessionList from './session/SessionList'
import Results from './results/Results'
import Lap from './lap/Lap'
import PitStop from './pit/PitStop'
import ParseError from '../../error/ParseError'

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

	static parseList({ Races: weekends }) {
		if (weekends && weekends.length) {
		  return weekends.map(weekend => this.parser({ Race: weekend }))
		}
	}

	static parser({ Race: weekend }) {
		try {
			return new Weekend({
				round: weekend.round,
				year: weekend.season,
				name: weekend.raceName,
				wiki: weekend.url,
				date: weekend.date,
				time: weekend.time,
				circuit: Circuit.parser({ Circuit: weekend.Circuit }),
				sessions: SessionList.parser({ Race: weekend }),
				results: this.#parseResults({ Race: weekend }),
				laps: this.#parseLaps({ Laps: weekend.Laps }),
				pits: this.#parsePits({ PitStops: weekend.PitStops })
			})
		} catch (err) {
			throw new ParseError(err.message)
		}
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
