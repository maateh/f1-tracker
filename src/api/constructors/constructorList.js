import { KEYS, ergast } from "../ergast"

// Get a list with all of the constructors in F1
export async function constructorList(params) {
  return ergast({
    url: `/constructors`,
    key: KEYS.CONSTRUCTOR_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
  
// Get a list with all of the constructor from a specific season
export async function constructorListFromSeason(year, params = { limit: 60 }) {
  return ergast({
    url: `/${year}/constructors`,
    key: KEYS.CONSTRUCTOR_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
