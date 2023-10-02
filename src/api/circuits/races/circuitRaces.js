import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get a list with all of the races in this circuit
export async function circuitRaces(circuitId, params = { limit: 30 }) {
  const url = `/circuits/${circuitId}/races`

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
        weekends: WeekendModel.parseList({ Races: data.Races })
      }
    })
}
