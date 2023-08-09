import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useScheduleFilterContext } from "../context/hooks/useScheduleFilterContext"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"

export const useSeasonsQuery = () => {
  const { dispatch } = useScheduleFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: FilterModel.querySeasons,
		onSuccess: filter => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter,
        param: year,
        searchable: true,
        onChange: (value) => navigate(`./${value}`, { replace: true })
      })
    })
  })
}
