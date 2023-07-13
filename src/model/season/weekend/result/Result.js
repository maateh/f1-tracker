// models
import Weekend from '../Weekend'
import Qualifying from './qualifying/Qualifying'
import Race from './race/Race'

class Result {
	constructor(data) {
		this.parseQualifying(data)
		this.parseRace(data)
	}

	// static async fetchResult(year, weekend) {
	// 	return Promise.all([
	// 		this.fetchQualifying(year, weekend),
	// 		this.fetchRace(year, weekend),
	// 	])
	// 		.then(data => {
  //       data[1].result.qualifying = data[0].result.qualifying
  //       return data[1]
  //     })
	// 		.catch(err => {
	// 			throw new Error(err)
	// 		})
	// }

	// static async fetchQualifying(year, weekend) {
	// 	return fetchData(`/${year}/${weekend}/qualifying`, 'RaceTable')
	// 		.then(data => new Weekend(data.Races[0]))
	// 		.catch(err => {
	// 			throw new Error(err)
	// 		})
	// }

	// static async fetchRace(year, weekend) {
	// 	return fetchData(`/${year}/${weekend}/results`, 'RaceTable')
	// 		.then(data => new Weekend(data.Races[0]))
	// 		.catch(err => {
	// 			throw new Error(err)
	// 		})
	// }

	parseQualifying(data) {
		if (data.QualifyingResults) {
			this.qualifying = data.QualifyingResults.map(
				result => new Qualifying(result)
			)
		}
	}

	parseRace(data) {
		if (data.Results) {
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

	get fastestDriver() {
		return this.race.find(r => +r.fastestLap?.rank === 1)
	}

	get laps() {
		return this.race[0].laps
	}

	get raceDuration() {
		return this.race[0].raceTime.time
	}
}

export default Result
