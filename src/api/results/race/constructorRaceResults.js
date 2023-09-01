import { KEYS, ergast } from "../../ergast"

// Get constructor race results from a specific round in a season
export async function constructorRaceResults(year, round, constructorId) {
  return ergast({
    url: `/${year}/${round}/constructors/${constructorId}/results`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
