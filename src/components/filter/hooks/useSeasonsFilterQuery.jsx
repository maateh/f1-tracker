import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"
import QueryError from "../../../model/error/QueryError"

const useSeasonsFilterQuery = ({ onChange, additionalOption }) => {
  const { setSeasons } = useFilterContext()
  const { year } = useParams()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: async () => FilterModel.querySeasons({ label: 'Select a Season' })
      .then(filter => setSeasons({
        seasons: new FilterSelectorModel({
          filter: additionalOption ? filter.addOption(additionalOption) : filter,
          param: year,
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

export default useSeasonsFilterQuery
