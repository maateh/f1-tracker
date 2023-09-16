import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import Filter from '../../../../components/filter/Filter'

// hooks
import useFilterQueries from '../../../../components/filter/hooks/useFilterQueries'
import useSeasonsFilterQuery from '../../../../components/filter/hooks/useSeasonsFilterQuery'
import useRoundsFilterQuery from '../../../../components/filter/hooks/useRoundsFilterQuery'
import useDriversFilterQuery from '../../../../components/filter/hooks/useDriversFilterQuery'

// context
import FilterContextProvider from '../../../../components/filter/context/FilterContext'
import ListingContextProvider from '../../../../components/listing/context/ListingContext'
import { PITS_PARAMS_UPDATER } from '../../../../components/filter/context/FilterContextActions'

// models
import WeekendModel from "../../../../model/season/weekend/Weekend"
import FilterSelectorModel from "../../../../model/filter/FilterSelector"
import FilterOptionModel from '../../../../model/filter/FilterOption'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const PitsHistory = () => {
  const { year, round, driverId } = useParams()
  const navigate = useNavigate()

  const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year, round }) => {
      const route = `./${year}/${round}/${driverId || 'all'}`
      navigate(route, { replace: true })
    },
		enabled: !year && !round,
	})

  return (
    <div className="history-category__container">
      {isLoading && <CircularProgress />}

      {year && round && (
        <FilterContextProvider selectors={{
          ...FilterSelectorModel.TYPES.SEASONS,
          ...FilterSelectorModel.TYPES.ROUNDS,
          ...FilterSelectorModel.TYPES.DRIVERS
        }}>
          <Filter
            useFilterQueries={useFilterQueries.bind(this, [
              useSeasonsFilterQuery.bind(this, {
                onChange: value => {
                  const pathname = `./${value}/1/${FilterOptionModel.ALL.value}`
                  const search = '?page=1'
                  navigate({ pathname, search }, { replace: true })
                }
              }),
              useRoundsFilterQuery.bind(this, {
                onChange: (value, { year }) => {
                  const pathname = `./${year}/${value}/${FilterOptionModel.ALL.value}`
                  const search = '?page=1'
                  navigate({ pathname, search }, { replace: true })
                }
              }),
              useDriversFilterQuery.bind(this, {
                onChange: (value, { year, round }) => {
                  const pathname = `./${year}/${round}/${value}`
                  const search = '?page=1'
                  navigate({ pathname, search }, { replace: true })
                },
                additionalOption: FilterOptionModel.ALL
              })
            ])}
            paramsUpdater={PITS_PARAMS_UPDATER}
            skeletonCounter={3}
          />
        </FilterContextProvider>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <ListingContextProvider>
        <Outlet />
      </ListingContextProvider>
    </div>
  )
}

export default PitsHistory
