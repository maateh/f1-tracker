import ergast, { RACE_TABLE } from "../ergast"

// models
import WeekendModel from "../../model/season/weekend/Weekend"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get pit stops from a specific race
export async function pitStops(year, round) {
  const url = `/${year}/${round}/pitstops`

  return ergast({
    url,
    key: RACE_TABLE,
    params: { limit: 200 }
  })
    .then(({ info, data }) => {
      if (!data.Races || !data.Races.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        weekend: WeekendModel.parser({
					Race: data.Races[0]
				})
      }
    })
}
