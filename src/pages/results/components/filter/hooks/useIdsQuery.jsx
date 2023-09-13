import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"
import { SET_IDS } from "../../../../../components/filter/context/FilterContextActions"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

const useIdsQuery = () => {
  const { selectors, dispatch } = useFilterContext()
  const { year, standings, id } = useParams()
  const navigate = useNavigate()

  return useQuery({
    ...idsQuery(year, standings),
    onSuccess: filter => dispatch({ 
      type: SET_IDS, 
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
    })
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

export default useIdsQuery
