import { ergast, KEYS } from "./ergast"

export const seasonList = () => {
  return ergast('/seasons', KEYS.SEASON_TABLE, {
    limit: 100
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverList = (year) => {
  return ergast(`/${year}/drivers`, KEYS.DRIVER_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorList = (year) => {
  return ergast(`/${year}/constructors`, KEYS.CONSTRUCTOR_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const season = (year) => {
  return ergast(`/${year}`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const round = (year, round) => {
  return ergast(`/${year}/${round}`, KEYS.RACE_TABLE, {
    limit: 100
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const lastRound = () => {
  return ergast('/current/last', KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const nextRound = () => {
  return ergast('/current/next', KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}