import { useEffect } from 'react'

// components
import FilterPicker from './picker/FilterPicker'
import SkeletonSelector from "../../../../components/skeleton/SkeletonSelector"

// context
import { useResultsFilterContext } from './context/hooks/useResultsFilterContext'

// model
import FilterOptionsModel from '../../../../model/filter/FilterOptions'

// styles
import './FilterSelector.css'

const FilterSelector = () => {
  const { years, loading, error, dispatch } = useResultsFilterContext()

  useEffect(() => {
		dispatch({ type: 'FETCH_YEARS_START' })
		FilterOptionsModel.fetchYears()
			.then(data => dispatch({ type: 'FETCH_YEARS_SUCCESS', payload: data }))
			.catch(err => dispatch({ type: 'FETCH_YEARS_ERROR', payload: err }))
	}, [dispatch])

  return (
    <div className="results-filter-selector">
      {!years && loading && <SkeletonSelector />}
      {error && <p className="error__element">{error.message}</p>}

      {years && <FilterPicker />}
    </div>
  )
}

export default FilterSelector