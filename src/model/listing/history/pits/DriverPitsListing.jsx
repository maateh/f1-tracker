// api
import { driverPitStops } from "../../../../api/history";

// models
import Season from "../../../season/Season";
import QueryError from "../../../error/QueryError";

class DriverPitsListing {
  static async query(year, round, driverId) {
    return driverPitStops(year, round, driverId)
      .then(({ data }) => {
        const season = new Season(data)
        if (!season.weekends) {
          throw new QueryError('No data found!', 404)
        }
        return new DriverPitsListing(season)
      })
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
  }

  constructor(season) {
    this.season = season
		this.title = `${season.year} ${this.weekend.name} Pit Stops`

		this.header = [
			{ key: 'stops', placeholder: 'Stops' },
			{ key: 'driver', placeholder: 'Driver' },
			{ key: 'lap', placeholder: 'Lap' },
			{ key: 'time', placeholder: 'Exact Time' },
			{ key: 'duration', placeholder: 'Duration' },
		]

		this.table = this.weekend.pits.map((pit, index) => ({
			key: index,
			data: [
				{ key: 'stops', data: pit.stop },
				{ key: 'driver', data: pit.driverId },
				{ key: 'lap', data: pit.lap },
				{ key: 'time', data: pit.time },
				{ key: 'duration', data: pit.duration },
			]
		}))
  }

  get weekend() {
		return this.season.weekends[0]
	}
}

export default DriverPitsListing
