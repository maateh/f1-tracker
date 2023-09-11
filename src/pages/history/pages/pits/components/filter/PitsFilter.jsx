import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
  const { selectors, dispatch } = usePitsFilterContext()
  const { preloading, loading, error } = usePitsFilterQueries()
	const params = useParams()

	useEffect(() => {
		if (preloading) return
		dispatch({ type: 'UPDATE_PARAMS', payload: params })
	}, [preloading, params, dispatch])

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
