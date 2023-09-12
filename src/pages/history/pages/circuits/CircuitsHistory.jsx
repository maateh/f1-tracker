import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import Filter from '../../../../components/filter/Filter'

// hooks
import useCircuitsFilterQueries from './components/filter/hooks/useCircuitsFilterQueries'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'
import FilterSelectorModel from '../../../../model/filter/FilterSelector'

const CircuitsHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="circuits-history">
      {year && (
        <>
          <FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
            <Filter useFilterQueries={useCircuitsFilterQueries} />
          </FilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default CircuitsHistory
