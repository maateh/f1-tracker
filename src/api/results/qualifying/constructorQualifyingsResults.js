import ergast, { KEYS } from "../../ergast"

// Get constructor all qualifying results
export async function constructorQualifyingsResults(constructorId) {
  return ergast({
    url: `/constructors/${constructorId}/qualifying`,
    key: KEYS.RACE_TABLE,
    params: { limit: 1000 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

// Get constructor qualifying results from a complete season
export async function constructorQualifyingsResultsFromSeason(year, constructorId) {
  return ergast({
    url: `/${year}/constructors/${constructorId}/qualifying`,
    key: KEYS.RACE_TABLE,
    params: { limit: 60 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
