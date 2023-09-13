import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import Filter from '../../../../components/filter/Filter'

// hooks
import useFilterQueries from '../../../../components/filter/hooks/useFilterQueries'
import useSeasonsQuery from '../../../../components/filter/hooks/useSeasonsQuery'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'

// models
import FilterSelectorModel from '../../../../model/filter/FilterSelector'
import FilterOptionModel from '../../../../model/filter/FilterOption'

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
            <Filter 
              useFilterQueries={
                useFilterQueries.bind(this, [
                  useSeasonsQuery.bind(this, {
                    onChange: (value) => navigate(`./${value}`, { replace: true }),
                    additionalOption: FilterOptionModel.ALL
                  })
                ])
              }
            />
          </FilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default CircuitsHistory
