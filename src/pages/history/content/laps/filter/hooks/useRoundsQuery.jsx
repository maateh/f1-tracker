import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// models
import FilterModel from "../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"

export const useRoundsQuery = () => {
  const { dispatch } = useLapsFilterContext()
  const { year, round } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['filter', 'roundList', year],
		queryFn: () => FilterModel.queryRounds(year),
		onSuccess: data => dispatch({ 
      type: 'SET_ROUNDS', 
      payload: new FilterSelectorModel({
        filter: data,
        param: round,
        searchable: true,
        setParam: (selector, { value }) => selector.param = value,
        onChange: ({ value }, { year, driverId }) => navigate(`./${year}/${value}/${driverId}`, { replace: true })
      })
    })
	})
}
