import { KEYS, ergast } from "../ergast"

// Get a list with all of the drivers in F1
export async function driverList() { // TODO: offset
  return ergast({
    url: `/drivers`,
    key: KEYS.DRIVER_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
  
// Get a list with all of the driver from a specific season
export async function driverListFromSeason(year) {
  return ergast({
    url: `/${year}/drivers`,
    key: KEYS.DRIVER_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

// Get a list with all of the driver from a specific round in a season
export async function driverListFromRound(year, round) {
  return ergast({
    url: `/${year}/${round}/drivers`,
    key: KEYS.DRIVER_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
