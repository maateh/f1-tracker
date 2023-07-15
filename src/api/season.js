import { ergast } from "./ergast"

export const seasonList = () => {
  return ergast('/seasons', 'SeasonTable', {
    limit: 100
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const season = (year) => {
  return ergast(`/${year}`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const round = (year, round) => {
  return ergast(`/${year}/${round}`, 'RaceTable', {
    limit: 100
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const lastRound = () => {
  return ergast('/current/last', 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const nextRound = () => {
  return ergast('/current/next', 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}