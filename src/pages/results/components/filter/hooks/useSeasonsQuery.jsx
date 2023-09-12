import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"
import { SET_SEASONS } from "../../../../../components/filter/context/FilterContextActions"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

export const useSeasonsQuery = () => {
  const { dispatch } = useFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: FilterModel.querySeasons,
		onSuccess: filter => dispatch({ 
      type: SET_SEASONS, 
      payload: new FilterSelectorModel({
        filter,
        param: year,
        searchable: true,
        onChange: (value, { standings }) => navigate(`./${value}/${standings}/${FilterOptionModel.ALL.value}`, { replace: true }),
        enabled: () => true
      })
    })
  })
}
