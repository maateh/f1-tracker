import axios from 'axios'

const BASE_URL = 'https://ergast.com/api/f1'
const URL_SUFFIX = '.json'

export const fetchData = async (url, key, query = '') => {
	return axios({
		url: `${BASE_URL}${url}${URL_SUFFIX}${query}`
	})
		.then(res => res.data.MRData[key])
		.catch(err => {
      throw new Error(`Could not fetch the data. (${err.message})`)
		})
}
