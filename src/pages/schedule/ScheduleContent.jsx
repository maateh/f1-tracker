import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import Filter from '../../components/filter/Filter'
import LoadingHandler from '../../components/loading/LoadingHandler'

// hooks
import useFilterQueries from '../../components/filter/hooks/useFilterQueries'
import useSeasonsQuery from '../../components/filter/hooks/useSeasonsQuery'

// context
import FilterContextProvider from '../../components/filter/context/FilterContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'
import FilterSelectorModel from '../../model/filter/FilterSelector'

const ScheduleContent = () => {
	const { year } = useParams()
	const navigate = useNavigate()

	const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year }) => navigate(`./${year}`, { replace: true }),
		enabled: !year,
	})

	return (
		<div className="schedule-content">
			{year && (
				<>
					<FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
						<Filter
							useFilterQueries={useFilterQueries.bind(this, [useSeasonsQuery])}
							skeletonCounter={1}
						/>
					</FilterContextProvider>
				</>
			)}

			<LoadingHandler isLoading={isLoading} isError={isError} error={error} />

			<Outlet />
		</div>
	)
}

export default ScheduleContent
