import { KEYS, ergast } from "../../ergast"

// Get driver race result from a specific round in a season
export async function driverRaceResults(year, round, driverId) {
  return ergast({
    url: `/${year}/${round}/drivers/${driverId}/results`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
