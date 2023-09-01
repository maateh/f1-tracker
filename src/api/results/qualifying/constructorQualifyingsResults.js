import { KEYS, ergast } from "../../../ergast"

// Get constructor qualifying results from a complete season
export async function constructorQualifyingsResults(year, constructorId) {
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
