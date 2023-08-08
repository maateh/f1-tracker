import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"

export const useDriversQuery = () => {
  const { dispatch } = usePitsFilterContext()
  const { year, driverId } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'driverList', year],
    queryFn: async () => FilterModel.queryDrivers(year),
    onSuccess: filter => dispatch({ 
      type: 'SET_DRIVERS', 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: driverId || FilterOptionModel.ALL.value,
        searchable: true,
        onChange: (value, { year, round }) => {
          const route = `./${year}/${round}/${value}`
          navigate(route, { replace: true })
        }
      })
    }),
  })
}
