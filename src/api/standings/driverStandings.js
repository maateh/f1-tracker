import { ergast, KEYS } from '../ergast'

// Get the driver standings from a specific season
export async function driverStandings(year, params = { limit: 60 }) {
	return ergast({
		url: `/${year}/driverStandings`,
		key: KEYS.STANDINGS_TABLE,
		params
	})
		.then(res => res)
		.catch(err => {
			throw new Error(err)
		})
}
