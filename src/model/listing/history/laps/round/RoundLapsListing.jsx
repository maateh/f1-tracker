// api
import { raceLap } from '../../../../../api/history'
import { raceResults } from '../../../../../api/results'

// model
import Season from '../../../../season/Season'
import QueryError from '../../../../error/QueryError'

class RoundLapsListing {
	static async query(year, round, lap) {
		return Promise.all([raceLap(year, round, lap), raceResults(year, round, { limit: 1 })])
			.then(data => {
				const season = new Season(data[0])
				const pages = data[1].Races[0].Results[0].laps
				if (!season.weekends) {
					throw new QueryError('No data found!', 404)
				}
				return new RoundLapsListing(season, pages)
			})
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
	}

	constructor(season, pages) {
    this.season = season
		this.title = `${season.year} ${this.weekend.name} Lap Timings`

		this.header = [
			{ key: 'position', placeholder: 'Position' },
			{ key: 'driver', placeholder: 'Driver' },
			{ key: 'time', placeholder: 'Time' },
		]

		this.table = this.currentLap.timings.map((timing, index) => ({
			key: index,
			data: [
				{ key: 'position', data: `#${timing.position}` },
				{ key: 'driver', data: timing.driverId },
				{ key: 'time', data: timing.time },
			]
		}))

		this.pagination = {
			max: parseInt(pages)
		}
	}

  get weekend() {
		return this.season.weekends[0]
	}

	get currentLap() {
		return this.weekend.laps[0]
	}
}

export default RoundLapsListing
