import ergast, { DRIVER_TABLE } from "../ergast"

// models
import DriverModel from "../../model/season/weekend/results/driver/Driver"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get a list with all of the drivers in F1
export async function driverList(params) {
  const url = `/drivers`

  return ergast({
    url,
    key: DRIVER_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Drivers || !data.Drivers.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        drivers: DriverModel.parseList({ Drivers: data.Drivers })
      }
    })
}
  
// Get a list with all of the driver from a specific season
export async function driverListFromSeason(year, params = { limit: 60 }) {
  const url = `/${year}/drivers`

  return ergast({
    url,
    key: DRIVER_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Drivers || !data.Drivers.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        drivers: DriverModel.parseList({ Drivers: data.Drivers })
      }
    })
}

// Get a list with all of the driver from a specific round in a season
export async function driverListFromRound(year, round, params = { limit: 60 }) {
  const url = `/${year}/${round}/drivers`

  return ergast({
    url,
    key: DRIVER_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Drivers || !data.Drivers.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        drivers: DriverModel.parseList({ Drivers: data.Drivers })
      }
    })
}
