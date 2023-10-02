import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get driver's all race results
export async function driverRacesResults(driverId, params = { limit: 500 }) {
  const url = `/drivers/${driverId}/results`

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

// Get driver's race results from a complete season
export async function driverRacesResultsFromSeason(year, driverId) {
  const url = `/${year}/drivers/${driverId}/results`

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
        weekends: WeekendModel.parseList({ Races: data.Races })
      }
    })
}
