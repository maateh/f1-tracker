import { KEYS, ergast } from "../../ergast"

// Get driver qualifying results from a complete season
export async function driverQualifyingsResults(year, driverId) {
  return ergast({
    url: `/${year}/drivers/${driverId}/qualifying`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
