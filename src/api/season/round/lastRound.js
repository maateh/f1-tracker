import ergast, { RACE_TABLE } from "../../ergast"

// models
import Weekend from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get info from the last weekend
export async function lastRound() {
  const url = '/current/last'

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
        weekend: Weekend.parser({ Race: data.Races[0] })
      }
    })
}
