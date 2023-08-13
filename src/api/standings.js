import { ergast, KEYS } from "./ergast"

export const driverStandings = async (year) => ergast({
  url: `/${year}/driverStandings`,
  key: KEYS.STANDINGS_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const constructorStandings = async (year) => ergast({
  url: `/${year}/constructorStandings`,
  key: KEYS.STANDINGS_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })
