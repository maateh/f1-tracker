import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// components
import Filter from "../../../../components/filter/Filter"

// hooks
import useLapsFilterQueries from "./components/filter/hooks/useLapsFilterQueries"

// context
import FilterContextProvider from "../../../../components/filter/context/FilterContext"
import { LAPS_PARAMS_UPDATER } from "../../../../components/filter/context/FilterContextActions"

// models
import WeekendModel from "../../../../model/season/weekend/Weekend"
import FilterOptionModel from "../../../../model/filter/FilterOption"
import FilterSelectorModel from "../../../../model/filter/FilterSelector"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const LapsHistory = () => {
  const { year, round } = useParams()
  const navigate = useNavigate()

	const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year, round }) => {
      const route = `./${year}/${round}/${FilterOptionModel.ALL.value}`
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
            useFilterQueries={useLapsFilterQueries}
            paramsUpdater={LAPS_PARAMS_UPDATER}
            skeletonCounter={3}
          />
        </FilterContextProvider>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </div>
  )
}

export default LapsHistory
