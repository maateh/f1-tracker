// components
import FilterSelector from '../../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../../components/skeleton/SkeletonSelector'

// context
import { usePitsFilterContext } from './context/hooks/usePitsFilterContext'

// hooks
import { usePitsFilterQueries } from './hooks/usePitsFilterQueries'

// styles
import './PitsFilter.css'

const PitsFilter = () => {
  const { selectors } = usePitsFilterContext()
  const { preloading, loading, error } = usePitsFilterQueries()

  return (
    <div className="pits-filter">
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

export default PitsFilter
