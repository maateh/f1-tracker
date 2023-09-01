import { ergast, KEYS } from "../ergast"

// Get the constructor standings from a specific season
export async function constructorStandings(year) {
  return ergast({
    url: `/${year}/constructorStandings`,
    key: KEYS.STANDINGS_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
