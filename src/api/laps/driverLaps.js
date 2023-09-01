import { KEYS, ergast } from "../ergast"

// Get driver lap timings from a specific a race
export async function driverLaps(year, round, driverId) {
  return ergast({
    url: `/${year}/${round}/drivers/${driverId}/laps`, 
    key: KEYS.RACE_TABLE, 
    params: { limit: 100 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
