import ergast, { KEYS } from "../../ergast"

// Get all races results from a specific season
export async function racesResults(year) {
  return ergast({
    url: `/${year}/results`,
    key: KEYS.RACE_TABLE,
    params: { limit: 500 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
