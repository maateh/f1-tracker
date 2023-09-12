import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../../../../../../../components/filter/context/hooks/useFilterContext"
import { SET_DRIVERS } from "../../../../../../../components/filter/context/FilterContextActions"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

const useDriversQuery = () => {
  const { dispatch } = useFilterContext()
  const { year, round, driverId } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'driverList', year, round],
    queryFn: async () => FilterModel.queryDrivers({ year, round }),
    onSuccess: filter => dispatch({ 
      type: SET_DRIVERS, 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: driverId || FilterOptionModel.ALL.value,
        searchable: true,
        onChange: (value, { year, round }) => {
          const route = `./${year}/${round}/${value}`
          navigate(route, { replace: true })
        },
        enabled: () => true
      })
    }),
  })
}

export default useDriversQuery
