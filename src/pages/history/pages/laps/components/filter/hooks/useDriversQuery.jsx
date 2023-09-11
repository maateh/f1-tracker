import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

export const useDriversQuery = () => {
  const { dispatch } = useLapsFilterContext()
  const { year, round, driverId } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['filter', 'driverList', year, round],
		queryFn: () => FilterModel.queryDrivers({ year, round }),
		onSuccess: filter => dispatch({ 
      type: 'SET_DRIVERS', 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: driverId,
        searchable: true,
        onChange: (value, { year, round }) => {
          const pathname = `./${year}/${round}/${value}`
          const search = '?page=1'
          navigate({ pathname, search }, { replace: true })
        }
      })
    })
	})
}
