import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"
import { SET_SEASONS } from "../context/FilterContextActions"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"

const useSeasonsFilterQuery = ({ onChange, additionalOption }) => {
  const { dispatch } = useFilterContext()
  const { year } = useParams()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: async () => FilterModel.querySeasons({ label: 'Select a Season' }),
		onSuccess: filter => dispatch({ 
      type: SET_SEASONS, 
      payload: new FilterSelectorModel({
        filter: additionalOption ? filter.addOption(additionalOption) : filter,
        param: year,
        searchable: true,
        onChange,
        enabled: () => true
      })
    })
  })
}

export default useSeasonsFilterQuery
