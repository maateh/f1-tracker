import { ergast, KEYS } from "./ergast"

// Get all of the season
export const seasonList = async () => ergast({
  url: '/seasons',
  key: KEYS.SEASON_TABLE,
  params: { limit: 100 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get all of the driver in a specific season
export const driverList = async (year) => ergast({
  url: `/${year}/drivers`,
  key: KEYS.DRIVER_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from a driver
export const driverInfo = async (year, driverId) => ergast({
  url: `/${year}/drivers/${driverId}`,
  key: KEYS.DRIVER_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get all of the constructor in a specific season
export const constructorList = async (year) => ergast({
  url: `/${year}/constructors`,
  key: KEYS.CONSTRUCTOR_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from a constructor
export const constructorInfo = async (year, constructorId) => ergast({
  url: `/${year}/constructors/${constructorId}`,
  key: KEYS.CONSTRUCTOR_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from a specific season
export const season = async (year) => ergast({
  url: `/${year}`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from a specific round in a season
export const round = async (year, round) => ergast({
  url: `/${year}/${round}`,
  key: KEYS.RACE_TABLE,
  params: { limit: 100 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from the last weekend
export const lastRound = async () => ergast({
  url: '/current/last',
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Get info from the next weekend
export const nextRound = async () => ergast({
  url: '/current/next',
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })
