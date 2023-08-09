// api
import { driverLaps } from '../../../../api/history'

// model
import Season from '../../../season/Season'
import QueryError from '../../../error/QueryError'

class DriverLapsListing {
	static async query(year, round, driverId, page) {
		return driverLaps(year, round, driverId, page)
			.then(({ info, data }) => {
				const season = new Season(data)
				const pages = Math.ceil(info.total / info.limit)
				if (!season.weekends) {
					throw new QueryError('No data found!', 404)
				}
				return new DriverLapsListing(season, pages)
			})
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
	}

	constructor(season, pages) {
    this.season = season
		this.title = `${season.year} ${this.weekend.name} {DRIVER_NAME} Lap Timings`

		this.header = [
			{ key: 'lap', placeholder: 'Lap' },
			{ key: 'driver', placeholder: 'Driver' },
			{ key: 'position', placeholder: 'Position' },
			{ key: 'time', placeholder: 'Time' },
		]

		this.table = this.weekend.laps.map((lap, index) => ({
			key: index,
			data: [
				{ key: 'lap', data: `#${lap.number}` },
				{ key: 'driver', data: lap.timings[0].driverId },
				{ key: 'position', data: lap.timings[0].position },
				{ key: 'time', data: lap.timings[0].time },
			]
		}))

		this.pagination = {
			max: parseInt(pages)
		}
	}

  get weekend() {
		return this.season.weekends[0]
	}
}

export default DriverLapsListing
