import { ergast, KEYS } from "./ergast"

// Lap Times
export const raceLap = async (year, round, lap) => ergast({
  url: `/${year}/${round}/laps/${lap}`,
  key: KEYS.RACE_TABLE, 
  params: {
    limit: 40
  }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const driverLaps = async (year, round, driverId) => ergast({
  url: `/${year}/${round}/drivers/${driverId}/laps`, 
  key: KEYS.RACE_TABLE, 
  params: {
    limit: 100
  }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })


// Pit Stops
export const pitStops = async (year, round, page) => ergast({
  url: `/${year}/${round}/pitstops`,
  key: KEYS.RACE_TABLE,
  params: {
    limit: 100
    // offset: (page - 1) * 20
  }
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const driverPitStops = async (year, round, driverId) => ergast({
  url: `/${year}/${round}/drivers/${driverId}/pitstops`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })

export const constructorPitStops = async (year, round, constructorId) => ergast({
  url: `/${year}/${round}/constructors/${constructorId}/pitstops`,
  key: KEYS.RACE_TABLE
})
  .then(res => res)
  .catch(err => {
    throw new Error(err)
  })
