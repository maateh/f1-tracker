import { ergast, KEYS } from "./ergast"

export const driverStandings = (year) => {
  return ergast(`/${year}/driverStandings`, KEYS.STANDINGS_TABLE)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorStandings = (year) => {
  return ergast(`/${year}/constructorStandings`, KEYS.STANDINGS_TABLE)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}
