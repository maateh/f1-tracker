import axios from 'axios'

// models
import NetworkError from '../model/error/NetworkError'

const BASE_URL = 'https://ergast.com/api/f1'
const URL_SUFFIX = '.json'

export const RACE_TABLE = 'RaceTable'
export const SEASON_TABLE = 'SeasonTable'
export const DRIVER_TABLE = 'DriverTable'
export const CONSTRUCTOR_TABLE = 'ConstructorTable'
export const CIRCUIT_TABLE = 'CircuitTable'
export const STANDINGS_TABLE = 'StandingsTable'

const ergast = async ({ url, key, params }) => {
	return axios.get(`${BASE_URL}${url}${URL_SUFFIX}`, { params })
		.then(({ data: { MRData: data } }) => {
			return {
				info: {
					url: data.url,
					limit: data.limit,
					offset: data.offset,
					total: data.total
				},
				data: data[key]
			}
		})
		.catch(err => {
			throw new NetworkError(err.message)
		})
}

export default ergast
