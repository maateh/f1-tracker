import { ergast } from "./ergast"

export const driverStandings = (year) => {
  return ergast(`/${year}/driverStandings`, 'StandingsTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorStandings = (year) => {
  return ergast(`/${year}/constructorStandings`, 'StandingsTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

// http://ergast.com/api/f1/2022/drivers/alonso/driverStandings.json