import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"
import { SET_ROUNDS } from "../context/FilterContextActions"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"

const useRoundsQuery = ({ onChange, additionalOption }) => {
  const { dispatch } = useFilterContext()
  const { year, round } = useParams()

  return useQuery({
		queryKey: ['filter', 'roundList', year],
		queryFn: () => FilterModel.queryRounds({ year }),
		onSuccess: filter => dispatch({ 
      type: SET_ROUNDS, 
      payload: new FilterSelectorModel({
        filter: additionalOption ? filter.addOption(additionalOption) : filter,
        param: round,
        searchable: true,
        onChange,
        enabled: () => true
      })
    })
	})
}

export default useRoundsQuery
