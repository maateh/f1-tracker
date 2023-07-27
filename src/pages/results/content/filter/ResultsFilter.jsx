import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import FilterSelector from './selector/FilterSelector'
import SkeletonSelector from '../../../../components/skeleton/SkeletonSelector'

// context
import { useResultsFilterContext } from './context/hooks/useResultsFilterContext'

// model
import FilterModel from '../../../../model/filter/Filter'

// styles
import './ResultsFilter.css'

const roundsQuery = year => ({
	queryKey: ['filter', 'roundList', year],
	queryFn: async () => FilterModel.queryRounds(year),
})

const driversQuery = year => ({
	queryKey: ['filter', 'driverList', year],
	queryFn: async () => FilterModel.queryDrivers(year),
})

const constructorsQuery = year => ({
	queryKey: ['filter', 'constructorList', year],
	queryFn: async () => FilterModel.queryConstructors(year),
})

const idsQuery = (year, standings) => {
	return standings === 'drivers'
		? driversQuery(year)
		: standings === 'constructors'
		? constructorsQuery(year)
		: roundsQuery(year)
}

const ResultsFilter = () => {
	const { seasons, ids, dispatch } = useResultsFilterContext()
	const { year, standings } = useParams()

	const { isLoading: seasonsLoading, isError, error } = useQuery({
    queryKey: ['filter', 'seasonList'],
    queryFn: FilterModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data }),
  })

  const { isLoading: idsLoading } = useQuery({
    ...idsQuery(year, standings),
    onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
  })

	return (
		<div className="results-filter">
			{seasonsLoading && <SkeletonSelector counter={1} />}

			{seasons && ids && <FilterSelector loading={idsLoading} />}

			{isError && <p className="error__element">{error.message}</p>}
		</div>
	)
}

export default ResultsFilter
