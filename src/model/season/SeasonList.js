// api
import { fetchData } from '../../api/fetchData'

// model
import Season from './Season'

class SeasonList {
	seasons = []

	constructor(data) {
		this.seasons = data.Seasons.map(season => {
			return new Season(season)
		})
	}

	static async fetch(url) {
		return fetchData(url, 'SeasonTable', '?limit=100')
			.then(data => new SeasonList(data))
			.catch(err => {
				throw new Error(err)
			})
	}

	getForSelect() {
		return this.seasons.map(season => ({
			value: season.year,
			label: season.year,
		})).reverse()
	}
}

export default SeasonList
