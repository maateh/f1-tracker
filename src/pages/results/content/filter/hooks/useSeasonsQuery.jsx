import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useResultsFilterContext } from "../context/hooks/useResultsFilterContext"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

export const useSeasonsQuery = () => {
  const { dispatch } = useResultsFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['results', 'filter', 'seasonList'],
		queryFn: FilterModel.querySeasons,
		onSuccess: data => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter: data,
        param: year,
        searchable: true,
        onChange: (value, { standings }) => navigate(`./${value}/${standings}/${FilterOptionModel.DEFAULT.value}`, { replace: true })
      })
    })
  })
}