import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// hooks
import useConstructorsFilterQueries from './components/filter/hooks/useConstructorsFilterQueries'

// components
import Filter from '../../../../components/filter/Filter'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'
import FilterSelectorModel from '../../../../model/filter/FilterSelector'

const ConstructorsHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="constructors-history">
      {year && (
        <>
          <FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
            <Filter useFilterQueries={useConstructorsFilterQueries} />
          </FilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default ConstructorsHistory
