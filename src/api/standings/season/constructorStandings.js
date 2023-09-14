import { ergast, KEYS } from "../../ergast"

// Get the constructor standings from a specific season
export async function constructorStandings(year, params = { limit: 60 }) {
  return ergast({
    url: `/${year}/constructorStandings`,
    key: KEYS.STANDINGS_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
