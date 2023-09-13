import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"
import { SET_DRIVERS } from "../context/FilterContextActions"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"

const useDriversQuery = ({ onChange, additionalOption }) => {
  const { dispatch } = useFilterContext()
  const { year, round, driverId } = useParams()

  return useQuery({
		queryKey: ['filter', 'driverList', year, round],
		queryFn: () => FilterModel.queryDrivers({ year, round }),
		onSuccess: filter => dispatch({ 
      type: SET_DRIVERS,
      payload: new FilterSelectorModel({
        filter: additionalOption ? filter.addOption(additionalOption) : filter,
        param: driverId,
        searchable: true,
        onChange,
        enabled: () => true
      })
    })
	})
}

export default useDriversQuery
