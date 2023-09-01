import axios from 'axios'

const BASE_URL = 'https://ergast.com/api/f1'
const URL_SUFFIX = '.json'

export const KEYS = {
	RACE_TABLE: 'RaceTable',
	SEASON_TABLE: 'SeasonTable',
	DRIVER_TABLE: 'DriverTable',
	CONSTRUCTOR_TABLE: 'ConstructorTable',
	STANDINGS_TABLE: 'StandingsTable'
}

export const ergast = async ({ url, key, params }) => {
	return axios.get(`${BASE_URL}${url}${URL_SUFFIX}`, { params })
		.then(({ data: { MRData: data } }) => ({
			info: {
				url: data.url,
				limit: data.limit,
				offset: data.offset,
				total: data.total
			},
			data: data[key]
		}))
		.catch(err => {
			throw new Error(`Could not fetch the data. (${err.message})`)
		})
}
