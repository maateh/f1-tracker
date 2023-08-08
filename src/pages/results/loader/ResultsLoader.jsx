// loaders
import { seasonLoader } from './rounds/SeasonLoader'
import { weekendRaceLoader } from './rounds/WeekendRaceLoader'
import { weekendQualifyingLoader } from './rounds/WeekendQualifyingLoader'
import { driverStandingsLoader } from './drivers/DriverStandingsLoader'
import { driverRacesLoader } from './drivers/DriverRacesLoader'
import { driverQualifyingsLoader } from './drivers/DriverQualifyingsLoader'
import { constructorStandingsLoader } from './constructors/ConstructorStandingsLoader'
import { constructorRacesLoader } from './constructors/ConstructorRacesLoader'

export const resultsLoader = ({ params }) => {
  switch (params.standings) {
    case 'rounds':
      return roundsRouting(params)
    case 'drivers':
      return driversRouting(params)
    case 'constructors':
      return constructorsRouting(params)
    default:
      return roundsRouting(params)
  }
}

// ROUNDS ROUTES
const roundsRouting = (params) => {
  switch (params.id) {
    case 'all':
      return seasonLoader(params)
    default:
      return roundSessionRouting(params)
  }
}

const roundSessionRouting = (params) => {
  switch (params.session) {
    case 'race':
      return weekendRaceLoader(params)
    case 'qualifying':
      return weekendQualifyingLoader(params)
    default:
      return weekendRaceLoader(params)
  }
}

// DRIVERS ROUTES
const driversRouting = (params) => {
  switch (params.id) {
    case 'all':
      return driverStandingsLoader(params)
    default:
      return driverSessionRouting(params)
  }
}

const driverSessionRouting = (params) => {
  switch (params.session) {
    case 'race':
      return driverRacesLoader(params)
    case 'qualifying':
      return driverQualifyingsLoader(params)
    default:
      return driverRacesLoader(params)
  }
}

// CONSTRUCTORS ROUTES
const constructorsRouting = (params) => {
  switch (params.id) {
    case 'all':
      return constructorStandingsLoader(params)
    default:
      return constructorRacesLoader(params)
  }
}