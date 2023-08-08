import { ergast, KEYS } from "./ergast"

export const qualifyingsResults = (year) => {
  return ergast(`/${year}/qualifying`, KEYS.RACE_TABLE, {
    limit: 500
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const racesResults = (year) => {
  return ergast(`/${year}/results`, KEYS.RACE_TABLE, {
    limit: 500
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const qualifyingResults = (year, round) => {
  return ergast(`/${year}/${round}/qualifying`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const raceResults = (year, round, params) => {
  return ergast(`/${year}/${round}/results`, KEYS.RACE_TABLE, params)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverRacesResults = (year, driverId) => {
  return ergast(`/${year}/drivers/${driverId}/results`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverQualifyingsResults = (year, driverId) => {
  return ergast(`/${year}/drivers/${driverId}/qualifying`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorRacesResults = (year, constructorId) => {
  return ergast(`/${year}/constructors/${constructorId}/results`, KEYS.RACE_TABLE, {
    limit: 60
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorQualifyingsResults = (year, constructorId) => {
  return ergast(`/${year}/constructors/${constructorId}/qualifying`, KEYS.RACE_TABLE, {
    limit: 60
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
