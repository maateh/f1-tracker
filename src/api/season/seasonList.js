import ergast, { SEASON_TABLE } from "../ergast"

// models
import SeasonModel from "../../model/season/Season"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get a list with all of the season
export async function seasonList(params = { limit: 100 }) {
	const url = '/seasons'

	return ergast({
		url,
		key: SEASON_TABLE,
		params,
	})
		.then(({ info, data }) => {
      if (!data.Seasons || !data.Seasons.length) {
        throw new DataNotFoundError(url)
      }

			return {
				info,
				seasons: SeasonModel.parseList({ Seasons: data.Seasons })
			}
		})
}
