// components
import FilterSelector from '../../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../../components/skeleton/SkeletonSelector'

// context
import { useDriversFilterContext } from './context/hooks/useDriversFilterContext'

// hooks
import { useDriversFilterQueries } from './hooks/useDriversFilterQueries'

// styles
import './DriversFilter.css'

const DriversFilter = () => {
	const { selectors } = useDriversFilterContext()
	const { preloading, loading, error } = useDriversFilterQueries()

	return (
		<div className="drivers-filter">
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

export default DriversFilter
