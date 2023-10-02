import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get all qualifyings results from a specific season
export async function roundsQualifyingsResults(year, ignoreDataNotFoundError = false, params = { limit: 500 }) {
  const url = `/${year}/qualifying`

  return ergast({
    url,
    key: RACE_TABLE,
    params
  })
    .then(({ info, data }) => {
      if ((!data.Races || !data.Races.length) && !ignoreDataNotFoundError) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        weekends: WeekendModel.parseList({ Races: data.Races })
      }
    })
}
