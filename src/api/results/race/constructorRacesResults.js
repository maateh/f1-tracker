import ergast, { KEYS } from "../../ergast"

// Get constructor all race results
export async function constructorRacesResults(constructorId) {
  return ergast({
    url: `/constructors/${constructorId}/results`,
    key: KEYS.RACE_TABLE,
    params: { limit: 1000 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

// Get constructor race results from a complete season
export async function constructorRacesResultsFromSeason(year, constructorId) {
  return ergast({
    url: `/${year}/constructors/${constructorId}/results`,
    key: KEYS.RACE_TABLE,
    params: { limit: 60 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
