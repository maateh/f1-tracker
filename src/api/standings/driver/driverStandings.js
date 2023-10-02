import ergast, { STANDINGS_TABLE } from '../../ergast'

// models
import StandingsModel from '../../../model/season/standings/Standings'
import DataNotFoundError from '../../../model/error/DataNotFoundError'

// Get a driver's championship standings results
export async function driverStandings(driverId) {
	const url = `/drivers/${driverId}/driverStandings`

	return ergast({
		url,
		key: STANDINGS_TABLE
	})
		.then(({ info, data }) => {
			if (!data.StandingsLists || !data.StandingsLists.length) {
				throw new DataNotFoundError(url)
			}

			return {
				info,
				standingsList: StandingsModel.parseList({
					StandingsLists: data.StandingsLists,
				})
			}
		})
}
