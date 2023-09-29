import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import Filter from '../../components/filter/Filter'
import FilterSkeleton from '../../components/skeletons/filter/FilterSkeleton'

// hooks
import useFilterQueries from '../../components/filter/hooks/useFilterQueries'
import useSeasonsFilterQuery from '../../components/filter/hooks/useSeasonsFilterQuery'

// context
import FilterContextProvider from '../../components/filter/context/FilterContext'
import ListingContextProvider from '../../components/listing/context/ListingContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'
import FilterSelectorModel from '../../model/filter/FilterSelector'

const ScheduleContent = () => {
	const { year } = useParams()
	const navigate = useNavigate()

	useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year }) => navigate(`./${year}`, { replace: true }),
		enabled: !year,
	})

	return (
		<div className="schedule-content">
			{year ? (
				<FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
					<Filter
						useFilterQueries={
							useFilterQueries.bind(this, [
								useSeasonsFilterQuery.bind(this, {
									onChange: (value) => navigate(`./${value}`, { replace: true }),
								})
							])
						}
						skeletonCounter={1}
					/>
				</FilterContextProvider>
			) : <FilterSkeleton counter={1} />}

			<ListingContextProvider>
				<Outlet />
			</ListingContextProvider>
		</div>
	)
}

export default ScheduleContent
