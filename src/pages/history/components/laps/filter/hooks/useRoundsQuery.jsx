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
		onSuccess: filter => dispatch({ 
      type: 'SET_ROUNDS', 
      payload: new FilterSelectorModel({
        filter,
        param: round,
        searchable: true,
        onChange: (value, { year, driverId }) => {
          const pathname = `./${year}/${value}/${driverId}`
          const search = '?page=1'
          navigate({ pathname, search }, { replace: true })
        }
      })
    })
	})
}
