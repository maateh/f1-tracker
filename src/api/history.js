import { ergast, KEYS } from "./ergast"

// Lap Times
export const raceLap = (year, round, lap) => {
  return ergast(`/${year}/${round}/laps/${lap}`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverLaps = (year, round, driverId, page) => {
  return ergast(`/${year}/${round}/drivers/${driverId}/laps`, KEYS.RACE_TABLE, {
    limit: 20,
    offset: (page - 1) * 20
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}


// Pit Stops
export const pitStops = (year, round, page) => {
  return ergast(`/${year}/${round}/pitstops`, KEYS.RACE_TABLE, {
    limit: 20,
    offset: (page - 1) * 20
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const driverPitStops = (year, round, driverId) => {
  return ergast(`/${year}/${round}/drivers/${driverId}/pitstops`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const constructorPitStops = (year, round, constructorId) => {
  return ergast(`/${year}/${round}/constructors/${constructorId}/pitstops`, KEYS.RACE_TABLE)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
