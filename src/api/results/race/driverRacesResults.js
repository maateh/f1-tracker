import ergast, { KEYS } from "../../ergast"

// Get driver all race results
export async function driverRacesResults(driverId) {
  return ergast({
    url: `/drivers/${driverId}/results`,
    key: KEYS.RACE_TABLE,
    params: { limit: 500 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

// Get driver race results from a complete season
export async function driverRacesResultsFromSeason(year, driverId) {
  return ergast({
    url: `/${year}/drivers/${driverId}/results`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
