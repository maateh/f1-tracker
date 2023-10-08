import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// context
import useFilterContext from "../context/hooks/useFilterContext"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"

const useRoundsFilterQuery = ({ onChange, additionalOption }) => {
  const { showBoundary } = useErrorBoundary()
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
      })),
    onError: err => showBoundary(err)
	})
}

export default useRoundsFilterQuery
