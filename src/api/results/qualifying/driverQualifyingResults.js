import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get driver qualifying result from a specific round in a season
export async function driverQualifyingResults(year, round, driverId) {
  const url = `/${year}/${round}/drivers/${driverId}/qualifying`

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
        weekend: WeekendModel.parseList({ Races: data.Races[0] })
      }
    })
}
