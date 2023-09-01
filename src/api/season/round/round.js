import { KEYS, ergast } from "../../ergast"

// Get info from a specific round in a season
export async function round(year, round) {
  return ergast({
    url: `/${year}/${round}`,
    key: KEYS.RACE_TABLE,
    params: { limit: 100 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
