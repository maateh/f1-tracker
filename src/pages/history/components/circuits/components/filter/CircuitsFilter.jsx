// components
import FilterSelector from '../../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../../components/skeleton/SkeletonSelector'

// context
import { useCircuitsFilterContext } from './context/hooks/useCircuitsFilterContext'

// hooks
import { useCircuitsFilterQueries } from './hooks/useCircuitsFilterQueries'

// styles
import './CircuitsFilter.css'

const CircuitsFilter = () => {
	const { selectors } = useCircuitsFilterContext()
	const { preloading, loading, error } = useCircuitsFilterQueries()

	return (
		<div className="circuits-filter">
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

export default CircuitsFilter
