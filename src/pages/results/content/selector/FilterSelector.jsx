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
import { useQuery } from 'react-query'

const FilterSelector = () => {
  const { seasons, dispatch } = useResultsFilterContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['seasonList'],
    queryFn: FilterOptionsModel.querySeasons,
    onSuccess: data => dispatch({ type: 'SET_SEASONS', payload: data })
  })

  return (
    <div className="results-filter-selector">
      {isLoading && <SkeletonSelector counter={1} />}

      {seasons && <FilterPicker />}

      {isError && <p className="error__element">{error.message}</p>}
    </div>
  )
}

export default FilterSelector