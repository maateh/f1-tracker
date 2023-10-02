import ergast, { KEYS } from "../../ergast"

// Get driver all qualifying results
export async function driverQualifyingsResults(driverId) {
  return ergast({
    url: `/drivers/${driverId}/qualifying`,
    key: KEYS.RACE_TABLE,
    params: { limit: 500 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

// Get driver qualifying results from a complete season
export async function driverQualifyingsResultsFromSeason(year, driverId) {
  return ergast({
    url: `/${year}/drivers/${driverId}/qualifying`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
