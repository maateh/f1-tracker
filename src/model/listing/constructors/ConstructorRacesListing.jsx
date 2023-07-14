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
				return new ConstructorRacesListing(season)
			})
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	constructor(season) {
		console.log('ConstructorRacesListing - season: ', season)
		this.season = season

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
					{ title: 'Team Name', desc: this.team.name },
					{ title: 'Nationality', desc: this.team.nationality },
				],
			},
		]

		this.header = [
			{ key: 'round', placeholder: 'Round' },
			{ key: 'weekend', placeholder: 'Weekend' },
			{ key: 'circuit', placeholder: 'Circuit' },
			{ key: 'driver', placeholder: 'Driver' },
			{ key: 'grid', placeholder: 'Grid' },
			{ key: 'fl', placeholder: 'Fastest Lap' },
			{ key: 'position', placeholder: 'Position' },
			{ key: 'points', placeholder: 'Points' },
			{ key: 'laps', placeholder: 'Completed Laps' },
			{ key: 'duration', placeholder: 'Race Gap' },
		]

		this.table = season.weekends
			.map((w, index) =>
				w.result.race.map(r => ({
					key: index + r.number,
					data: [
						{ key: 'round', data: w.round },
						{ key: 'weekend', data: w.name },
						{ key: 'circuit', data: w.circuit.name },
						{ key: 'driver', data: r.driver.fullName },
						{ key: 'grid', data: r.grid },
						{
							key: 'fl',
							data: [
								{ key: 'fl-time', data: r.fastestLap.time },
								{ key: 'fl-speed', data: r.fastestLap?.avgSpeed },
							],
						},
						{ key: 'position', data: r.position },
						{ key: 'points', data: r.points },
						{ key: 'laps', data: r.laps },
						{ key: 'duration', data: r.raceTime },
					],
				}))
			).flat(1)
	}

	get team() {
		return this.season.weekends[0].result.race[0].constructor
	}
}

export default ConstructorRacesListing
