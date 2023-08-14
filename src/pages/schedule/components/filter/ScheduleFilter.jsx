// components
import FilterSelector from '../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../components/skeleton/SkeletonSelector'

// context
import { useScheduleFilterContext } from './context/hooks/useScheduleFilterContext'

// hooks
import { useScheduleFilterQueries } from './hooks/useScheduleFilterQueries'

// styles
import './ScheduleFilter.css'

const ScheduleFilter = () => {
	const { selectors } = useScheduleFilterContext()
	const { preloading, loading, error } = useScheduleFilterQueries()

	return (
		<div className="schedule-filter">
			{preloading ? (
				<SkeletonSelector counter={1} />
			) : (
				Object.values(selectors).map(selector => (
					<FilterSelector
						key={selector.filter.key}
						selector={selector}
						loading={loading}
					/>
				))
			)}

			{error && <p className="error__element">{error.message}</p>}
		</div>
	)
}

export default ScheduleFilter
