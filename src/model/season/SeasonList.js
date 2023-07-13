// model
import Season from './Season'

class SeasonList {
	constructor(data) {
		return data.Seasons.map(season => new Season(season))
	}
}

export default SeasonList
