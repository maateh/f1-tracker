import Season from './Season'

class SeasonList {
	seasons = []

	constructor(data) {
		this.seasons = data.Seasons.map(season => {
			return new Season(season)
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
