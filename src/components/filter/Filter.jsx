import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// components
import FilterSelector from './selector/FilterSelector'
import SkeletonSelector from '../skeleton/SkeletonSelector'

// context
import useFilterContext from './context/hooks/useFilterContext'

// styles
import './Filter.css'

const Filter = ({ useFilterQueries, paramsUpdater, skeletonCounter = 1 }) => {
	const params = useParams()
	const { selectors, dispatch } = useFilterContext()
	const { preloading, loading, error } = useFilterQueries()

	useEffect(() => {
		if (preloading) return
		if (paramsUpdater) dispatch({ type: paramsUpdater, payload: params })
	}, [preloading, paramsUpdater, params, dispatch])

	return (
		<ul className="filter__container">
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
		</ul>
	)
}

export default Filter
