import ergast, { KEYS } from "../../ergast"

// Get race results from a specific round in a season
export async function raceResults(year, round, params) {
  return ergast({
    url: `/${year}/${round}/results`,
    key: KEYS.RACE_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
