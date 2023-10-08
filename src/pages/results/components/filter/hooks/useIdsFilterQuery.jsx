import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

const useIdsFilterQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { selectors, setIds } = useFilterContext()
  const { year, standings, id } = useParams()
  const navigate = useNavigate()

  return useQuery({
    ...idsQuery(year, standings),
    onSuccess: filter => setIds({
      ids: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: id,
        searchable: true,
        onChange: (value, { year, standings }) => {
          let route = `./${year}/${standings}/${value}`
          if (standings.match('^(drivers|rounds)$') && value !== 'all') {
            route += `/${selectors.sessions.param}`
          }
          navigate(route, { replace: true })
        },
        enabled: () => true
      })
    }),
    onError: () => showBoundary()
  })
}

const idsQuery = (year, standings) => {
	return standings === 'drivers'
		? driversQuery(year)
		: standings === 'constructors'
		? constructorsQuery(year)
		: roundsQuery(year)
}

const roundsQuery = year => ({
	queryKey: ['filter', 'roundList', year],
	queryFn: async () => FilterModel.queryRounds({ year }),
})

const driversQuery = year => ({
	queryKey: ['filter', 'driverList', year],
	queryFn: async () => FilterModel.queryDrivers({ year }),
})

const constructorsQuery = year => ({
	queryKey: ['filter', 'constructorList', year],
	queryFn: async () => FilterModel.queryConstructors({ year }),
})

export default useIdsFilterQuery
