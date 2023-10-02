import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get constructor race results from a specific round in a season
export async function constructorRaceResults(year, round, constructorId) {
  const url = `/${year}/${round}/constructors/${constructorId}/results`

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
        weekends: WeekendModel.parser({ Races: data.Races[0] })
      }
    })
}
