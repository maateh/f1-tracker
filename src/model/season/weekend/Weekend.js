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

	get active() {
		return this.sessions.practices[0].start < Date.now()
	}

	get pole() {
		return 'POLE'
  }

  get winningDriver() {
    return this.results[0].driver.fullName
  }

  get winningConstructor() {
    return this.results[0].constructor.name
  }

  get fastestDriver() {
		return this.results.reduce((prev, curr) => {
			if (!prev || !prev.fastestLap) {
				return curr
			}
			if (!curr || !curr.fastestLap) {
				return prev
			}
			return prev.fastestLap.Time.time < curr.fastestLap.Time.time ? prev : curr
		})
  }

	get fastestLapTime() {
		return this.fastestDriver.fastestLap.Time.time
	}

  get laps() {
    return this.results[0].laps
  }

  get raceDuration() {
    return this.results[0].time.time
  }
}

export default Weekend
