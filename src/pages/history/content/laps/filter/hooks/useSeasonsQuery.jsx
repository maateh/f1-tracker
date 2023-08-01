import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"

export const useSeasonsQuery = () => {
  const { dispatch } = useLapsFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['history', 'laps', 'filter', 'seasonList'],
		queryFn: FilterModel.querySeasons,
		onSuccess: filter => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter,
        param: year,
        searchable: true,
        onChange: value => navigate(`./${value}/1/${FilterOptionModel.ALL.value}`, { replace: true })
      })
    })
	})
}
