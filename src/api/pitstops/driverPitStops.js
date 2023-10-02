import ergast, { KEYS } from "../ergast"

// Get driver pit stops from a specific race
export async function driverPitStops(year, round, driverId) {
  return ergast({
    url: `/${year}/${round}/drivers/${driverId}/pitstops`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
