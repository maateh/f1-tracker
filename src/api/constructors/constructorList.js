import { KEYS, ergast } from "../ergast"

// Get a list with all of the constructors in F1
export async function constructorList() { // TODO: offset
  return ergast({
    url: `/constructors`,
    key: KEYS.CONSTRUCTOR_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
  
// Get a list with all of the constructor from a specific season
export async function constructorListFromSeason(year) {
  return ergast({
    url: `/${year}/constructors`,
    key: KEYS.CONSTRUCTOR_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
