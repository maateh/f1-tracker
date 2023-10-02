import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get driver all qualifying results
export async function driverQualifyingsResults(driverId) {
  const url = `/drivers/${driverId}/qualifying`

  return ergast({
    url,
    key: RACE_TABLE,
    params: { limit: 500 }
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

// Get driver qualifying results from a complete season
export async function driverQualifyingsResultsFromSeason(year, driverId) {
  const url = `/${year}/drivers/${driverId}/qualifying`

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
