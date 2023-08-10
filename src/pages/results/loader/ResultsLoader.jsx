// queries
import { getSeasonQuery } from './query/rounds/SeasonQuery'
import { getWeekendRaceQuery } from './query/rounds/WeekendRaceQuery'
import { getWeekendQualifyingQuery } from './query/rounds/WeekendQualifyingQuery'
import { getDriverStandingsQuery } from './query/drivers/DriverStandingsQuery'
import { getDriverRacesQuery } from './query/drivers/DriverRacesQuery'
import { getDriverQualifyingsQuery } from './query/drivers/DriverQualifyingsQuery'
import { getConstructorStandingsQuery } from './query/constructors/ConstructorStandingsQuery'
import { getConstructorRacesQuery } from './query/constructors/ConstructorRacesQuery'

export const resultsLoader = ({ params }) => {
	switch (params.standings) {
		case 'rounds':
			return routeRounds(params)
		case 'drivers':
			return routeDrivers(params)
		case 'constructors':
			return routeConstructors(params)
		default:
			return routeRounds(params)
	}
}

// ROUNDS ROUTES
const routeRounds = params => {
	switch (params.id) {
		case 'all':
			return getSeasonQuery(params)
		default:
			return routeRoundSession(params)
	}
}

const routeRoundSession = params => {
	switch (params.session) {
		case 'race':
			return getWeekendRaceQuery(params)
		case 'qualifying':
			return getWeekendQualifyingQuery(params)
		default:
			return getWeekendRaceQuery(params)
	}
}

// DRIVERS ROUTES
const routeDrivers = params => {
	switch (params.id) {
		case 'all':
			return getDriverStandingsQuery(params)
		default:
			return routeDriverSession(params)
	}
}

const routeDriverSession = params => {
	switch (params.session) {
		case 'race':
			return getDriverRacesQuery(params)
		case 'qualifying':
			return getDriverQualifyingsQuery(params)
		default:
			return getDriverRacesQuery(params)
	}
}

// CONSTRUCTORS ROUTES
const routeConstructors = params => {
	switch (params.id) {
		case 'all':
			return getConstructorStandingsQuery(params)
		default:
			return getConstructorRacesQuery(params)
	}
}
