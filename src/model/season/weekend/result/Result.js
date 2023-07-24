// models
import Qualifying from './qualifying/Qualifying'
import Race from './race/Race'

class Result {
	constructor(data) {
		this.parseQualifying(data)
		this.parseRace(data)
	}

	parseQualifying(data) {
		if (data.QualifyingResults && data.QualifyingResults.length) {
			this.qualifying = data.QualifyingResults.map(
				result => new Qualifying(result)
			)
		}
	}

	parseRace(data) {
		if (data.Results && data.Results.length) {
			this.race = data.Results.map(result => new Race(result))
		}
	}
}

export default Result
