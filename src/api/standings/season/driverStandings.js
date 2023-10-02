import ergast, { STANDINGS_TABLE } from '../../ergast'

// models
import StandingsModel from '../../../model/season/standings/Standings'
import DataNotFoundError from '../../../model/error/DataNotFoundError'

// Get the driver standings from a specific season
export async function driverStandings(year, params = { limit: 60 }) {
	const url = `/${year}/driverStandings`

	return ergast({
		url,
		key: STANDINGS_TABLE,
		params
	})
		.then(({ info, data }) => {
			if (!data.StandingsLists || !data.StandingsLists.length) {
				throw new DataNotFoundError(url)
			}

			return {
				info,
				standings: StandingsModel.parser({
					StandingsList: data.StandingsLists[0]
				})
			}
		})
}
