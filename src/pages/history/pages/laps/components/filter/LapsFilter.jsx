import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import FilterSelector from '../../../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../../../components/skeleton/SkeletonSelector'

// context
import { useLapsFilterContext } from './context/hooks/useLapsFilterContext'

// hooks
import { useLapsFilterQueries } from './hooks/useLapsFilterQueries'

// styles
import './LapsFilter.css'

const LapsFilter = () => {
	const { selectors, dispatch } = useLapsFilterContext()
  const { preloading, loading, error } = useLapsFilterQueries()
	const params = useParams()
  
	useEffect(() => {
		if (preloading) return
		dispatch({ type: 'UPDATE_PARAMS', payload: params })
	}, [preloading, params, dispatch])

	return (
		<div className="laps-filter">
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
