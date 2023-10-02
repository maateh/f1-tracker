import ergast, { KEYS } from "../ergast"

// Get info from a driver
export async function driver(driverId) {
  return ergast({
    url: `/drivers/${driverId}`,
    key: KEYS.DRIVER_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
