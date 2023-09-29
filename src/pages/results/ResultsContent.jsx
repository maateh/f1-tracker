import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import Filter from '../../components/filter/Filter'
import FilterSkeleton from '../../components/skeletons/filter/FilterSkeleton'

// hooks
import useResultsFilterQueries from './components/filter/hooks/useResultsFilterQueries'

// context
import FilterContextProvider from '../../components/filter/context/FilterContext'
import { RESULTS_PARAMS_UPDATER } from '../../components/filter/context/FilterContextActions'
import ListingContextProvider from '../../components/listing/context/ListingContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'
import FilterOptionModel from '../../model/filter/FilterOption'
import FilterSelectorModel from '../../model/filter/FilterSelector'

const ResultsContent = () => {
	const { year, id } = useParams()
	const navigate = useNavigate()

	useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year }) =>
			navigate(`./${year}/rounds/${FilterOptionModel.ALL.value}`, { replace: true }),
		enabled: !year && !id,
	})

	return (
		<div className="results-content">
			{year && id ? (
				<FilterContextProvider 
					selectors={{
						...FilterSelectorModel.TYPES.SEASONS,
						...FilterSelectorModel.TYPES.STANDINGS,
						...FilterSelectorModel.TYPES.IDS,
						...FilterSelectorModel.TYPES.SESSIONS
					}}>
					<Filter
						useFilterQueries={useResultsFilterQueries}
						paramsUpdater={RESULTS_PARAMS_UPDATER}
						skeletonCounter={3}
					/>
				</FilterContextProvider>
			) : <FilterSkeleton counter={3} />}

			<ListingContextProvider>
				<Outlet />
			</ListingContextProvider>
		</div>
	)
}

export default ResultsContent
