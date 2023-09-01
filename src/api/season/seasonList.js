import { KEYS, ergast } from "../ergast"

// Get a list with all of the season
export async function seasonList() {
	return ergast({
		url: '/seasons',
		key: KEYS.SEASON_TABLE,
		params: { limit: 100 },
	})
		.then(res => res)
		.catch(err => {
			throw new Error(err)
		})
}
