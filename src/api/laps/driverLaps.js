import ergast, { RACE_TABLE } from "../ergast"

// models
import WeekendModel from "../../model/season/weekend/Weekend"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get driver lap timings from a specific a race
export async function driverLaps(year, round, driverId) {
  const url = `/${year}/${round}/drivers/${driverId}/laps`

  return ergast({
    url, 
    key: RACE_TABLE, 
    params: { limit: 100 }
  })
    .then(({ info, data }) => {
      if (!data.Races || !data.Races.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        weekend: WeekendModel.parser({ Race: data.Races[0] })
      }
    })
}
