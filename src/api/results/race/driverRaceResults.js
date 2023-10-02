import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get driver race result from a specific round in a season
export async function driverRaceResults(year, round, driverId) {
  const url = `/${year}/${round}/drivers/${driverId}/results`

  return ergast({
    url,
    key: RACE_TABLE
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
