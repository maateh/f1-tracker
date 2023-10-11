import ergast, { RACE_TABLE } from "../../ergast"

// models
import WeekendModel from "../../../model/season/weekend/Weekend"
import DataNotFoundError from "../../../model/error/DataNotFoundError"

// Get constructor all qualifying results
export async function constructorQualifyingsResults(constructorId, params = { limit: 1000 }) {
  const url = `/constructors/${constructorId}/qualifying`

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

// Get constructor all qualifying results (with "bypassing" the API call limit)
export async function constructorQualifyingsResultsWithoutAPILimit(
  constructorId,
  // API query params
  params = { offset: 0, limit: 1000 },
  // Helper params for the recursive calls
  // maxLimit: maximum callbacks limitation
  // counter: callbacks counter
  callbacks = { maxLimit: 3, counter: 1 }
) {
  return constructorQualifyingsResults(constructorId, params)
    .then(async ({ info, weekends }) => {
      // Safety return to definitely avoid
      // any accidental infinite loop
      if (callbacks.counter >= callbacks.maxLimit) {
        return { info, weekends }
      }

      // Recursive call
      if (info.total > parseInt(info.offset) + parseInt(info.limit)) {
        await constructorQualifyingsResultsWithoutAPILimit(
          constructorId,
          { ...params, offset: parseInt(info.offset) + parseInt(info.limit) },
          { ...callbacks, counter: callbacks.counter + 1 }
        ).then(res => weekends.push(...res.weekends))
      }
      return { info, weekends }
    })
}


// Get constructor qualifying results from a complete season
export async function constructorQualifyingsResultsFromSeason(year, constructorId, params = { limit: 60 }) {
  const url = `/${year}/constructors/${constructorId}/qualifying`

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
