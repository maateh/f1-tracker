import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const { options, currentFilters, loading, error, dispatch } = useResultsFilterContext()

	useEffect(() => {
		navigate(currentFilters.getRoute(), { replace: true })
	}, [navigate, currentFilters])

  useEffect(() => {
		dispatch({ type: 'FETCH_OPTIONS_START' })
		FilterOptionsModel.fetch(currentFilters.year.value)
			.then(data => dispatch({ type: 'FETCH_OPTIONS_SUCCESS', payload: data }))
			.catch(err => dispatch({ type: 'FETCH_OPTIONS_ERROR', payload: err }))
	}, [currentFilters.year, dispatch])

  return (
    <div className="results-filter-selector">
      {loading && <SkeletonSelector />}
      {error && <p className="error__element">{error.message}</p>}

      {options && <FilterPicker />}
    </div>
  )
}

export default FilterSelector