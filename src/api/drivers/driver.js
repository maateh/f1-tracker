import ergast, { DRIVER_TABLE } from "../ergast"

// models
import DriverModel from "../../model/season/weekend/results/driver/Driver"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get info from a driver
export async function driver(driverId) {
  const url = `/drivers/${driverId}`

  return ergast({
    url,
    key: DRIVER_TABLE
  })
    .then(({ info, data }) => {
      if (!data.Drivers || !data.Drivers.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        driver: DriverModel.parser({ Driver: data.Drivers[0] })
      }
    })
}
