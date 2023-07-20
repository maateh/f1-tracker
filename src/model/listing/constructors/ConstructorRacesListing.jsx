// api
import { constructorRacesResults } from '../../../api/results'

// model
import Season from '../../season/Season'
import QueryError from '../../error/QueryError'

class ConstructorRacesListing {
	static async query(year, constructorId) {
		return constructorRacesResults(year, constructorId)
			.then(data => {
				const season = new Season(data)
				if (!season.weekends) {
					throw new QueryError('No data found!', 404)
				}
				return new ConstructorRacesListing(season)
			})
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
	}

	constructor(season) {
		console.log('ConstructorRacesListing - season: ', season)
		this.season = season

		this.title = `${season.year} Race Results - ${this.team.name}`
		this.info = [
			{
				category: 'General Information',
				data: [
					{ title: 'Season', desc: season.year },
					{ title: 'Rounds', desc: season.weekends.length },
				],
			},
			{
				category: 'Constructor Information',
				data: [
					{ title: 'Team Name', desc: this.team?.name },
					{ title: 'Nationality', desc: this.team?.nationality },
				],
			},
		]

		this.header = [
			{ key: 'round', placeholder: 'Round' },
			{ key: 'weekend', placeholder: 'Weekend' },
			{ key: 'date', placeholder: 'Date' },
			{ key: 'circuit', placeholder: 'Circuit Name' },
			
			{ key: 'fl', placeholder: 'Fastest Lap' },
			{ key: 'laps', placeholder: 'Completed Laps' },
			{ key: 'points', placeholder: 'Points' },
		]

		this.table = season.weekends.map((w, index) => ({
			key: index,
			data: [
				{ key: 'round', data: w.round },
				{ key: 'weekend', data: w.name },
				{ key: 'date', data: w.getFormattedDate('MMM dd.') },
				{ key: 'circuit', data: w.circuit.name },

				{ key: 'fl', data: [
					{ key: 'fl-time', data: this.faster(w).fastestLap.time },
					{ key: 'fl-driver', data: this.fasterDriver(w) },
				] },
				{ key: 'laps', data: `${this.completedLaps(w)} laps` },
				{ key: 'points', data: [
					{ key: 'points-amount', data: `${this.points(w)} points` },
					{ key: 'points-drivers', data: this.scorers(w) },
				] },
			]
		}))
	}

	get team() {
		return this.season.weekends[0]?.result.race[0].constructor
	}

	faster(weekend) {
		return weekend.result.race
			.sort((acc, curr) => Math.min(acc.fastestLap.rank, curr.fastestLap.rank))[0]
	}

	fasterDriver(weekend) {
		const faster = this.faster(weekend)
		return faster.fastestLap.time === '-' ? 
			'' : faster.driver.code
	}

	completedLaps(weekend) {
		return weekend.result.race.length > 1 ?
			weekend.result.race
				.reduce((acc, curr) => +acc.laps || acc + +curr.laps) :
			weekend.result.race[0].laps
	}

	points(weekend) {
		return weekend.result.race
			.reduce((acc, curr) => +acc.points || acc + +curr.points, 0)
	}

	scorers(weekend) {
		const result = weekend.result.race
		return result
			.reduce((acc, curr) => `${acc} ${curr.driver.code}: ${curr.points} - `, '')
			.slice(0, -3)
	}
}

export default ConstructorRacesListing
