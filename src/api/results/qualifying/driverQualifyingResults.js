import { KEYS, ergast } from "../../ergast"

// Get driver qualifying result from a specific round in a season
export async function driverQualifyingResults(year, round, driverId) {
  return ergast({
    url: `/${year}/${round}/drivers/${driverId}/qualifying`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
