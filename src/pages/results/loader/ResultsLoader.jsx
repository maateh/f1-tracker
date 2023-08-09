// queries
import { seasonQuery } from './query/rounds/SeasonQuery'
import { weekendRaceQuery } from './query/rounds/WeekendRaceQuery'
import { weekendQualifyingQuery } from './query/rounds/WeekendQualifyingQuery'
import { driverStandingsQuery } from './query/drivers/DriverStandingsQuery'
import { driverRacesQuery } from './query/drivers/DriverRacesQuery'
import { driverQualifyingsQuery } from './query/drivers/DriverQualifyingsQuery'
import { constructorStandingsQuery } from './query/constructors/ConstructorStandingsQuery'
import { constructorRacesQuery } from './query/constructors/ConstructorRacesQuery'

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
const roundsRouting = params => {
	switch (params.id) {
		case 'all':
			return seasonQuery(params)
		default:
			return roundSessionRouting(params)
	}
}

const roundSessionRouting = params => {
	switch (params.session) {
		case 'race':
			return weekendRaceQuery(params)
		case 'qualifying':
			return weekendQualifyingQuery(params)
		default:
			return weekendRaceQuery(params)
	}
}

// DRIVERS ROUTES
const driversRouting = params => {
	switch (params.id) {
		case 'all':
			return driverStandingsQuery(params)
		default:
			return driverSessionRouting(params)
	}
}

const driverSessionRouting = params => {
	switch (params.session) {
		case 'race':
			return driverRacesQuery(params)
		case 'qualifying':
			return driverQualifyingsQuery(params)
		default:
			return driverRacesQuery(params)
	}
}

// CONSTRUCTORS ROUTES
const constructorsRouting = params => {
	switch (params.id) {
		case 'all':
			return constructorStandingsQuery(params)
		default:
			return constructorRacesQuery(params)
	}
}
