import { KEYS, ergast } from "../../ergast"

// Get constructor race results from a complete season
export async function constructorRacesResults(year, constructorId) {
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
