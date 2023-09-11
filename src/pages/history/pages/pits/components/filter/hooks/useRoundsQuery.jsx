import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

export const useRoundsQuery = () => {
  const { dispatch } = usePitsFilterContext()
  const { year, round } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['filter', 'roundList', year],
		queryFn: () => FilterModel.queryRounds({ year }),
		onSuccess: filter => dispatch({ 
      type: 'SET_ROUNDS', 
      payload: new FilterSelectorModel({
        filter,
        param: round,
        searchable: true,
        onChange: (value) => {
          const route = `./${year}/${value}/${FilterOptionModel.ALL.value}`
          navigate(route, { replace: true })
        }
      })
    })
	})
}
