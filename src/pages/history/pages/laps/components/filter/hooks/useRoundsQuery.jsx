import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../../../../../../../components/filter/context/hooks/useFilterContext"
import { SET_ROUNDS } from "../../../../../../../components/filter/context/FilterContextActions"

// models
import FilterModel from "../../../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../../../model/filter/FilterSelector"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

const useRoundsQuery = () => {
  const { dispatch } = useFilterContext()
  const { year, round } = useParams()
  const navigate = useNavigate()

  return useQuery({
		queryKey: ['filter', 'roundList', year],
		queryFn: () => FilterModel.queryRounds({ year }),
		onSuccess: filter => dispatch({ 
      type: SET_ROUNDS, 
      payload: new FilterSelectorModel({
        filter,
        param: round,
        searchable: true,
        onChange: (value, { year }) => {
          const pathname = `./${year}/${value}/${FilterOptionModel.ALL.value}`
          const search = '?page=1'
          navigate({ pathname, search }, { replace: true })
        },
        enabled: () => true
      })
    })
	})
}

export default useRoundsQuery
