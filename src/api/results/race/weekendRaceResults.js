import ergast, { RACE_TABLE } from "../../ergast"

import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get race results from a specific round in a season
export async function weekendRaceResults(year, round, params) {
  const url = `/${year}/${round}/results`

  return ergast({
    url,
    key: RACE_TABLE,
    params
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
