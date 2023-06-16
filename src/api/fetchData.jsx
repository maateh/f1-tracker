import axios from 'axios'

const baseUrl = 'https://ergast.com/api/f1'
const suffixUrl = '.json'

export const fetchData = async (url, key, query = '') => {
	return axios({
		url: `${baseUrl}${url}${suffixUrl}${query}`
	})
		.then(res => res.data.MRData[key])
		.catch(err => {
      throw new Error(`Could not fetch the data. (${err})`)
		})
}
