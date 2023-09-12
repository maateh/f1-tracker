import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import Filter from '../../../../components/filter/Filter'

// hooks
import useDriversFilterQueries from './components/filter/hooks/useDriversFilterQueries'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'
import FilterSelectorModel from '../../../../model/filter/FilterSelector'

const DriversHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="drivers-history">
      {year && (
        <>
          <FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
            <Filter useFilterQueries={useDriversFilterQueries} />
          </FilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default DriversHistory
