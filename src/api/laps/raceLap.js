import ergast, { RACE_TABLE } from "../ergast"

// models
import WeekendModel from "../../model/season/weekend/Weekend"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get lap timings from a specific lap in a race
export async function raceLap(year, round, lap) {
  const url = `/${year}/${round}/laps/${lap}`

  return ergast({
    url,
    key: RACE_TABLE, 
    params: { limit: 40 }
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
