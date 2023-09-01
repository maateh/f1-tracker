import { ergast, KEYS } from '../ergast'

// Get the driver standings from a specific season
export async function driverStandings(year) {
	return ergast({
		url: `/${year}/driverStandings`,
		key: KEYS.STANDINGS_TABLE
	})
		.then(res => res)
		.catch(err => {
			throw new Error(err)
		})
}
