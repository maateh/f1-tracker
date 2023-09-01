import { KEYS, ergast } from "../../ergast"

// Get qualifying results from a specific round in a season
export async function qualifyingResults(year, round) {
  return ergast({
    url: `/${year}/${round}/qualifying`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
