import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"

// components
const SeasonListing = lazy(() => import('../components/listing/rounds/SeasonListing'))
const WeekendRaceListing = lazy(() => import('../components/listing/rounds/WeekendRaceListing'))
const WeekendQualifyingListing = lazy(() => import('../components/listing/rounds/WeekendQualifyingListing'))

const DriverStandingsListing = lazy(() => import('../components/listing/drivers/DriverStandingsListing'))
const DriverRacesListing = lazy(() => import('../components/listing/drivers/DriverRacesListing'))
const DriverQualifyingsListing = lazy(() => import('../components/listing/drivers/DriverQualifyingsListing'))

const ConstructorStandingsListing = lazy(() => import('../components/listing/constructors/ConstructorStandingsListing'))
const ConstructorRacesListing = lazy(() => import('../components/listing/constructors/ConstructorRacesListing'))

const ResultsLoader = () => {
  const params = useParams()

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
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <SeasonListing />
        </Suspense>
      )
		default:
			return routeRoundSession(params)
	}
}

const routeRoundSession = params => {
	switch (params.session) {
		case 'race':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <WeekendRaceListing />
        </Suspense>
      )
		case 'qualifying':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <WeekendQualifyingListing />
        </Suspense>
      )
		default:
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <WeekendRaceListing />
        </Suspense>
      )
	}
}

// DRIVERS ROUTES
const routeDrivers = params => {
	switch (params.id) {
		case 'all':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <DriverStandingsListing />
        </Suspense>
      )
		default:
			return routeDriverSession(params)
	}
}

const routeDriverSession = params => {
	switch (params.session) {
		case 'race':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <DriverRacesListing />
        </Suspense>
      )
		case 'qualifying':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <DriverQualifyingsListing />
        </Suspense>
      )
		default:
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <DriverRacesListing />
        </Suspense>
      )
	}
}

// CONSTRUCTORS ROUTES
const routeConstructors = params => {
	switch (params.id) {
		case 'all':
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <ConstructorStandingsListing />
        </Suspense>
      )
		default:
			return (
        <Suspense fallback={<p>ListingSkeleton - title, cards[3], table</p>}>
          <ConstructorRacesListing />
        </Suspense>
      )
	}
}

export default ResultsLoader
