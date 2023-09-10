import { KEYS, ergast } from "../ergast"

// Get a list with all of the circuits in F1
export async function circuitList(params) {
  return ergast({
    url: `/circuits`,
    key: KEYS.CIRCUIT_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
  
// Get a list with all of the circuit from a specific season
export async function circuitListFromSeason(year, params = { limit: 60 }) {
  return ergast({
    url: `/${year}/circuits`,
    key: KEYS.CIRCUIT_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
