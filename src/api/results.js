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

export const driverRacesResults = (year, driverId) => {
  return ergast(`/${year}/drivers/${driverId}/results`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverQualifyingsResults = (year, driverId) => {
  return ergast(`/${year}/drivers/${driverId}/qualifying`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorRacesResults = (year, constructorId) => {
  return ergast(`/${year}/constructors/${constructorId}/results`, 'RaceTable', {
    limit: 60
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorQualifyingsResults = (year, constructorId) => {
  return ergast(`/${year}/constructors/${constructorId}/qualifying`, 'RaceTable', {
    limit: 60
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}
