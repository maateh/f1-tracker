import { ergast, KEYS } from "./ergast"

export const seasonList = async () => ergast({
  url: '/seasons',
  key: KEYS.SEASON_TABLE,
  params: { limit: 100 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const driverList = async (year) => ergast({
  url: `/${year}/drivers`,
  key: KEYS.DRIVER_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const constructorList = async (year) => ergast({
  url: `/${year}/constructors`,
  key: KEYS.CONSTRUCTOR_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const season = async (year) => ergast({
  url: `/${year}`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const round = async (year, round) => ergast({
  url: `/${year}/${round}`,
  key: KEYS.RACE_TABLE,
  params: { limit: 100 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const lastRound = async () => ergast({
  url: '/current/last',
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const nextRound = async () => ergast({
  url: '/current/next',
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })
