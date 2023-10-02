import ergast, { STANDINGS_TABLE } from "../../ergast"

// models
import StandingsModel from "../../../model/season/standings/Standings"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get a constructor's championship standings results
export async function constructorStandings(constructorId, params = { limit: 100 }) {
  const url = `/constructors/${constructorId}/constructorStandings`

  return ergast({
    url,
    key: STANDINGS_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.StandingsLists || !data.StandingsLists.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        standingsList: StandingsModel.parseList({
					StandingsLists: data.StandingsLists,
				})
      }
    })
}
