// api
import { seasonList } from '../../api/season'

// model
import Season from './Season'

class SeasonList {
	seasons = []

	constructor(data) {
		this.seasons = data.Seasons.map(season => {
			return new Season(season)
		})
	}

	static async query() {
		return seasonList()
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
