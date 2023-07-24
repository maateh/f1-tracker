import { ergast } from "./ergast"

// Lap Times
export const raceLap = (year, round, lap) => {
  return ergast(`/${year}/${round}/laps/${lap}`, 'RaceTable')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverLaps = (year, round, driverId, offset) => {
  return ergast(`/${year}/${round}/drivers/${driverId}/laps`, 'RaceTable', {
    limit: 20,
    offset
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}


// Pit Stops
export const pitStops = (year, round, offset) => {
  return ergast(`/${year}/${round}/pitstops`, 'RaceTable', {
    limit: 20,
    offset
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverPitStops = (year, round, driverId, offset) => {
  return ergast(`/${year}/${round}/drivers/${driverId}pitstops`, 'RaceTable', {
    limit: 20,
    offset
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorPitStops = (year, round, constructorId, offset) => {
  return ergast(`/${year}/${round}/constructors/${constructorId}pitstops`, 'RaceTable', {
    limit: 20,
    offset
  })
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    })
}
