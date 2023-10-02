import ergast, { KEYS } from '../../ergast'

// Get a driver championship standings results
export async function driverStandings(driverId) {
	return ergast({
		url: `/drivers/${driverId}/driverStandings`,
		key: KEYS.STANDINGS_TABLE
	})
		.then(res => res)
		.catch(err => {
			throw new Error(err)
		})
}
