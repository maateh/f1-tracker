// components
import FilterSelector from '../../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../../components/skeleton/SkeletonSelector'

// context
import { useConstructorsFilterContext } from './context/hooks/useConstructorsFilterContext'

// hooks
import { useConstructorsFilterQueries } from './hooks/useConstructorsFilterQueries'

// styles
import './ConstructorsFilter.css'

const ConstructorsFilter = () => {
	const { selectors } = useConstructorsFilterContext()
	const { preloading, loading, error } = useConstructorsFilterQueries()

	return (
		<div className="constructors-filter">
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

export default ConstructorsFilter
