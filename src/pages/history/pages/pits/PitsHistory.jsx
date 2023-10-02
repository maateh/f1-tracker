import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// api
import { lastRound } from '../../../../api/season/round/lastRound'

// components
import Filter from '../../../../components/filter/Filter'
import FilterSkeleton from '../../../../components/skeletons/filter/FilterSkeleton'

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
import FilterSelectorModel from "../../../../model/filter/FilterSelector"
import FilterOptionModel from '../../../../model/filter/FilterOption'

const PitsHistory = () => {
  const { year, round, driverId } = useParams()
  const navigate = useNavigate()

  useQuery({
		queryKey: ['lastRound'],
		queryFn: () => lastRound()
      .then(({ weekend }) => {
        const route = `./${weekend.year}/${weekend.round}/${driverId || 'all'}`
        navigate(route, { replace: true })
      }),
		enabled: !year && !round,
	})

  return (
    <div className="history-category__container">
      {year && round ? (
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
      ) : <FilterSkeleton counter={3} />}

      <ListingContextProvider>
        <Outlet />
      </ListingContextProvider>
    </div>
  )
}

export default PitsHistory
