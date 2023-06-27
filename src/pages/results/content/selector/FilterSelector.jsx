import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
  const params = useParams()
  const { options, loading, error, dispatch } = useResultsFilterContext()

  useEffect(() => {
    const year = params.year ? params.year : new Date().getFullYear()
    
		dispatch({ type: 'FETCH_OPTIONS_START' })
		FilterOptionsModel.fetch(year)
			.then(data => dispatch({ type: 'FETCH_OPTIONS_SUCCESS', payload: data }))
			.catch(err => dispatch({ type: 'FETCH_OPTIONS_ERROR', payload: err }))
	}, [params.year, dispatch])

  return (
    <div className="results-filter-selector">
      {loading && <SkeletonSelector />}
      {error && <p className="error__element">{error.message}</p>}

      {options && <FilterPicker />}
    </div>
  )
}

export default FilterSelector