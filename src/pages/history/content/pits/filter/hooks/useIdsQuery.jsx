import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"

export const useIdsQuery = () => {
  const { dispatch } = usePitsFilterContext()
  const { year, type, id } = useParams()
  const navigate = useNavigate()

  return useQuery({
    ...idsQuery(year, type),
    onSuccess: filter => dispatch({ 
      type: 'SET_IDS', 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: id,
        searchable: true,
        onChange: (value, { year, round, type }) => {
          const route = `./${year}/${round}/${type}/${value}`
          navigate(route, { replace: true })
        }
      })
    }),
  })
}

const idsQuery = (year, type) => {
	return type === 'constructors'
		? constructorsQuery(year)
		: driversQuery(year)
}

const driversQuery = year => ({
	queryKey: ['filter', 'driverList', year],
	queryFn: async () => FilterModel.queryDrivers(year),
})

const constructorsQuery = year => ({
	queryKey: ['filter', 'constructorList', year],
	queryFn: async () => FilterModel.queryConstructors(year),
})
