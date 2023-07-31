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
		onSuccess: data => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter: data,
        param: year,
        searchable: true,
        setParam: (selector, { value }) => selector.param = value,
        onChange: ({ value }) => navigate(`./${value}/${FilterOptionModel.DEFAULT.value}/${FilterOptionModel.DEFAULT.value}`, { replace: true })
      })
    })
	})
}
