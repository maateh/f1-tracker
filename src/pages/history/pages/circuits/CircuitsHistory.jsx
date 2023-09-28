import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import Filter from '../../../../components/filter/Filter'

// hooks
import useFilterQueries from '../../../../components/filter/hooks/useFilterQueries'
import useSeasonsFilterQuery from '../../../../components/filter/hooks/useSeasonsFilterQuery'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'
import ListingContextProvider from '../../../../components/listing/context/ListingContext'

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
        <FilterContextProvider selectors={FilterSelectorModel.TYPES.SEASONS}>
          <Filter 
            useFilterQueries={
              useFilterQueries.bind(this, [
                useSeasonsFilterQuery.bind(this, {
                  onChange: (value) => navigate(`./${value}`, { replace: true }),
                  additionalOption: FilterOptionModel.ALL
                })
              ])
            }
          />
        </FilterContextProvider>
      )}

      <ListingContextProvider>
        <Outlet />
      </ListingContextProvider>
    </div>
  )
}

export default CircuitsHistory
