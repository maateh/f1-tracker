import { ergast } from "./ergast"

export const seasonQualifyingResults = (year) => {
  return ergast(`/${year}/qualifying`, 'RaceTable', {
    limit: 500
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const seasonRaceResults = (year) => {
  return ergast(`/${year}/results`, 'RaceTable', {
    limit: 500
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const roundQualifyingResults = (year, round) => {
  return ergast(`/${year}/${round}/qualifying`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const roundRaceResults = (year, round) => {
  return ergast(`/${year}/${round}/results`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}
