import ergast, { KEYS } from "../../ergast"

// Get all qualifyings results from a specific season
export async function qualifyingsResults(year) {
  return ergast({
    url: `/${year}/qualifying`,
    key: KEYS.RACE_TABLE,
    params: { limit: 500 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
