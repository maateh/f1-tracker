import ergast, { RACE_TABLE } from "../../ergast"

// models
import Weekend from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get info from a specific round in a season
export async function round(year, round, params = { limit: 100 }) {
  const url = `/${year}/${round}`

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
        weekend: Weekend.parser({ Race: data.Races[0] })
      }
    })
}
