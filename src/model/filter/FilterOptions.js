// api
import { fetchData } from '../../api/fetchData'

// model
import SeasonList from '../season/SeasonList'
import WeekendList from '../season/weekend/WeekendList'

class FilterTypes {
	#years = []
	#weekends = []
	#sessions = []

	constructor(years, weekends) {
		this.#years = new SeasonList(years)
		this.#weekends = [
			{ round: 'all', name: 'ALL' },
			...new WeekendList(weekends)
		]
		this.#sessions = [
			{ value: 'summary', label: 'SUMMARY' },
			{ value: 'qualifying', label: 'Qualifying' },
			{ value: 'race', label: 'Race' }
		]
	}

	static async fetch(year) {
		const fetchYears = fetchData('/seasons', 'SeasonTable', '?limit=100')
		const fetchWeekends = fetchData(`/${year}`, 'RaceTable')

		return Promise.all([fetchYears, fetchWeekends])
			.then(data => {
				return new FilterTypes(data[0], data[1])
			})
			.catch(err => {
				throw new Error(err)
			})
	}


	get years() {
		return this.#years.seasons.map(season => ({ value: season.year, label: season.year })).reverse()
	}

	get weekends() {
		return this.#weekends.map(weekend => ({ value: weekend.round, label: weekend.name }))
	}
	
	get sessions() {
		return this.#sessions
	}
	
	getWeekendName(round) {
		return this.#weekends.find(w => w.round === round).name
	}

	getSessionLabel(session) {
		return this.#sessions.find(s => s.value === session).label
	}
}

export default FilterTypes