import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"

export const useSeasonsQuery = () => {
  const { dispatch } = usePitsFilterContext()
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
        onChange: (value, { type }) => {
          const route = `./${value}/1/${type}/${FilterOptionModel.ALL.value}`
          navigate(route, { replace: true })
        }
      })
    })
  })
}
