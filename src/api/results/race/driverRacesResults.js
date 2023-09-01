import { ergast, KEYS } from "../../ergast"

// Get driver race results from a complete season
export async function driverRacesResults(year, driverId) {
  return ergast({
    url: `/${year}/drivers/${driverId}/results`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
