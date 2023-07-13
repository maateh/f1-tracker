import { ergast } from "./ergast"

export const qualifyingsResults = (year) => {
  return ergast(`/${year}/qualifying`, 'RaceTable', {
    limit: 500
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const racesResults = (year) => {
  return ergast(`/${year}/results`, 'RaceTable', {
    limit: 500
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const qualifyingResults = (year, round) => {
  return ergast(`/${year}/${round}/qualifying`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const raceResults = (year, round) => {
  return ergast(`/${year}/${round}/results`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}
