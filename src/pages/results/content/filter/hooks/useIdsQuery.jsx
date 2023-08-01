import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useResultsFilterContext } from "../context/hooks/useResultsFilterContext"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

export const useIdsQuery = () => {
  const { selectors, dispatch } = useResultsFilterContext()
  const { year, standings, id } = useParams()
  const navigate = useNavigate()

  return useQuery({
    ...idsQuery(year, standings),
    onSuccess: filter => dispatch({ 
      type: 'SET_IDS', 
      payload: new FilterSelectorModel({
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
	queryKey: ['results', 'filter', 'roundList', year],
	queryFn: async () => FilterModel.queryRounds(year),
})

const driversQuery = year => ({
	queryKey: ['results', 'filter', 'driverList', year],
	queryFn: async () => FilterModel.queryDrivers(year),
})

const constructorsQuery = year => ({
	queryKey: ['results', 'filter', 'constructorList', year],
	queryFn: async () => FilterModel.queryConstructors(year),
})
