import ergast, { RACE_TABLE } from "../ergast"

// models
import SeasonModel from "../../model/season/Season"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get info from a specific season
export async function season(year) {
  const url = `/${year}`

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
        season: SeasonModel.parser({ Season: data })
      }
    })
}
