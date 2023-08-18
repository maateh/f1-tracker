import { useParams } from 'react-router-dom'

// components
import FilterSelector from '../../../../components/filter/FilterSelector'
import SkeletonSelector from '../../../../components/skeleton/SkeletonSelector'

// context
import { useResultsFilterContext } from './context/hooks/useResultsFilterContext'

// hooks
import { useResultsFilterQueries } from './hooks/useResultsFilterQueries'

// styles
import './ResultsFilter.css'
import { useEffect } from 'react'

const ResultsFilter = () => {
	const { selectors, dispatch } = useResultsFilterContext()
	const { preloading, loading, error } = useResultsFilterQueries()
	const params = useParams()

	useEffect(() => {
		if (preloading) return
		dispatch({ type: 'UPDATE_PARAMS', payload: params })
	}, [preloading, params, dispatch])

	return (
		<div className="results-filter">
			{preloading ? (
				<SkeletonSelector counter={3} />
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

export default ResultsFilter
