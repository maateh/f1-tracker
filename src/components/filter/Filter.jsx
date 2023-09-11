import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import FilterSelector from './FilterSelector'
import SkeletonSelector from '../skeleton/SkeletonSelector'

// context
import { useFilterContext } from './context/hooks/useFilterContext'

// styles
import './Filter.css'

const Filter = ({ useFilterQueries, skeletonCounter }) => {
	const params = useParams()
	const { selectors, dispatch } = useFilterContext()
	const { preloading, loading, error } = useFilterQueries()

	useEffect(() => {
		if (preloading) return
		dispatch({ type: 'UPDATE_PARAMS', payload: params })
	}, [preloading, params, dispatch])

	return (
		<div className="filter__container">
      {console.log('selectors: ', selectors)}
      {console.log('preloading: ', preloading)}
			{preloading ? (
				<SkeletonSelector counter={skeletonCounter} />
			) : (
				Object.values(selectors).map(
					selector =>
						selector.enabled(params) && (
							<FilterSelector
								key={selector.filter.key}
								selector={selector}
								loading={loading}
							/>
						)
				)
			)}

			{error && <p className="error__element">{error.message}</p>}
		</div>
	)
}

export default Filter
