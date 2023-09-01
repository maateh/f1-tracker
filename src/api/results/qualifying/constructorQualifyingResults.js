import { KEYS, ergast } from "../../ergast"

// Get constructor qualifying results from a specific round in a season
export async function constructorQualifyingResults(year, round, constructorId) {
  return ergast({
    url: `/${year}/${round}/constructors/${constructorId}/qualifying`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
