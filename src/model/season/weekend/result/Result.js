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

	get pole() {
		return this.qualifying[0]
	}

	get raceWinner() {
		return this.race[0].driver.fullName
	}

	get raceWinnerConstructor() {
		return this.race[0].constructor.name
	}

	get fastest() {
		return this.race.find(r => +r.fastestLap?.rank === 1)
	}

	get laps() {
		return this.race[0].laps
	}

	get raceDuration() {
		return this.race[0].raceTime
	}
}

export default Result
