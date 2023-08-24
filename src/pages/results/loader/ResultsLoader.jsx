// components
import SeasonListing from '../components/listing/rounds/SeasonListing'
import WeekendRaceListing from '../components/listing/rounds/WeekendRaceListing'
import WeekendQualifyingListing from '../components/listing/rounds/WeekendQualifyingListing'

import DriverStandingsListing from '../components/listing/drivers/DriverStandingsListing'
import DriverRacesListing from '../components/listing/drivers/DriverRacesListing'
import DriverQualifyingsListing from '../components/listing/drivers/DriverQualifyingsListing'

import ConstructorStandingsListing from '../components/listing/constructors/ConstructorStandingsListing'
import ConstructorRacesListing from '../components/listing/constructors/ConstructorRacesListing'

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
			return <SeasonListing />
		default:
			return routeRoundSession(params)
	}
}

const routeRoundSession = params => {
	switch (params.session) {
		case 'race':
			return <WeekendRaceListing />
		case 'qualifying':
			return <WeekendQualifyingListing />
		default:
			return <WeekendRaceListing />
	}
}

// DRIVERS ROUTES
const routeDrivers = params => {
	switch (params.id) {
		case 'all':
			return <DriverStandingsListing />
		default:
			return routeDriverSession(params)
	}
}

const routeDriverSession = params => {
	switch (params.session) {
		case 'race':
			return <DriverRacesListing />
		case 'qualifying':
			return <DriverQualifyingsListing />
		default:
			return <DriverRacesListing />
	}
}

// CONSTRUCTORS ROUTES
const routeConstructors = params => {
	switch (params.id) {
		case 'all':
			return <ConstructorStandingsListing />
		default:
			return <ConstructorRacesListing />
	}
}
