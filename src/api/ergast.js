import axios from 'axios'

const BASE_URL = 'https://ergast.com/api/f1'
const URL_SUFFIX = '.json'

export const ergast = async (url, key, params) => {
	return axios
		.get(`${BASE_URL}${url}${URL_SUFFIX}`, { params })
		.then(res => res.data.MRData[key])
		.catch(err => {
			throw new Error(`Could not fetch the data. (${err.message})`)
		})
}
