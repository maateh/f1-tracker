import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"

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
        onChange: (value, { driverId }) => {
          const route = `./${year}/${value}/${driverId}`
          navigate(route, { replace: true })
        }
      })
    })
	})
}
