import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"
import QueryError from "../../../model/error/QueryError"

const useRoundsFilterQuery = ({ onChange, additionalOption }) => {
  const { setRounds } = useFilterContext()
  const { year, round } = useParams()

  return useQuery({
		queryKey: ['filter', 'roundList', year],
		queryFn: () => FilterModel.queryRounds({ year })
      .then(filter => setRounds({
        rounds: new FilterSelectorModel({
          filter: additionalOption ? filter.addOption(additionalOption) : filter,
          param: round,
          searchable: true,
          onChange,
          enabled: () => true
        })
      }))
      .catch(err => {
        throw new QueryError(err.message)
      })
	})
}

export default useRoundsFilterQuery
