import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useConstructorsFilterContext } from "../context/hooks/useConstructorsFilterContext"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

export const useSeasonsQuery = () => {
  const { dispatch } = useConstructorsFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: async () => FilterModel.querySeasons({ label: 'Select a Season' }),
		onSuccess: filter => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter: filter.addOption(FilterOptionModel.ALL),
        param: year,
        searchable: true,
        onChange: (value) => navigate(`./${value}`, { replace: true })
      })
    })
  })
}
