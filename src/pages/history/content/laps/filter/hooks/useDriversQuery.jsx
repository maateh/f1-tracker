import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"

export const useDriversQuery = () => {
  const { dispatch } = useLapsFilterContext()
  const { year, driverId } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['filter', 'driverList', year],
		queryFn: () => FilterModel.queryDrivers(year),
		onSuccess: filter => dispatch({ 
      type: 'SET_DRIVERS', 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.DEFAULT),
        param: driverId,
        searchable: true,
        onChange: (value, { year, round }) => navigate(`./${year}/${round}/${value}`, { replace: true })
      })
    })
	})
}
