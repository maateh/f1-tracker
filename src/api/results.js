import { ergast, KEYS } from "./ergast"

// Results from a complete SEASON
export const qualifyingsResults = async (year) => ergast({
  url: `/${year}/qualifying`,
  key: KEYS.RACE_TABLE,
  params: { limit: 500 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const racesResults = async (year) => ergast({
  url: `/${year}/results`,
  key: KEYS.RACE_TABLE,
  params: { limit: 500 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })


// Results from a complete WEEKEND
export const qualifyingResults = async (year, round) => ergast({
  url: `/${year}/${round}/qualifying`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const raceResults = async (year, round, params) => ergast({
  url: `/${year}/${round}/results`,
  key: KEYS.RACE_TABLE,
  params
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })


// Driver results from a complete SEASON
export const driverQualifyingsResults = async (year, driverId) => ergast({
  url: `/${year}/drivers/${driverId}/qualifying`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const driverRacesResults = async (year, driverId) => ergast({
  url: `/${year}/drivers/${driverId}/results`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Constructor results from a complete SEASON
export const constructorQualifyingsResults = async (year, constructorId) => ergast({
  url: `/${year}/constructors/${constructorId}/qualifying`,
  key: KEYS.RACE_TABLE,
  params: { limit: 60 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const constructorRacesResults = async (year, constructorId) => ergast({
  url: `/${year}/constructors/${constructorId}/results`,
  key: KEYS.RACE_TABLE,
  params: { limit: 60 }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

// Driver results from a complete WEEKEND
export const driverQualifyingResults = async (year, round, driverId) => ergast({
  url: `/${year}/${round}/drivers/${driverId}/qualifying`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const driverRaceResults = async (year, round, driverId) => ergast({
  url: `/${year}/${round}/drivers/${driverId}/results`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })


// Constructor results from a complete WEEKEND
export const constructorQualifyingResults = async (year, round, constructorId) => ergast({
  url: `/${year}/${round}/constructors/${constructorId}/qualifying`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const constructorRaceResults = async (year, round, constructorId) => ergast({
  url: `/${year}/${round}/constructors/${constructorId}/results`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })
