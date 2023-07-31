// components
import FilterSelector from '../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../components/skeleton/SkeletonSelector'

// context
import { useLapsFilterContext } from './context/hooks/useLapsFilterContext'

// hooks
import { useLapsFilterQueries } from './hooks/useLapsFilterQueries'

const LapsFilter = () => {
	const { selectors } = useLapsFilterContext()
  const { preloading, loading, error } = useLapsFilterQueries()
  
	return (
		<div>
			{preloading ? (
				<SkeletonSelector counter={3} />
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

export default LapsFilter
