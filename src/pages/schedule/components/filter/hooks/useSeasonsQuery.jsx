import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"

// models
import FilterModel from "../../../../../model/filter/Filter"
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"

const useSeasonsQuery = () => {
  const { dispatch } = useFilterContext()
  const { year } = useParams()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['filter', 'seasonList'],
		queryFn: async () => FilterModel.querySeasons({ label: 'Select a Season' }),
		onSuccess: filter => dispatch({ 
      type: 'SET_SEASONS', 
      payload: new FilterSelectorModel({
        filter,
        param: year,
        searchable: true,
        onChange: (value) => navigate(`./${value}`, { replace: true }),
        enabled: () => true
      }),
    })
  })
}

export default useSeasonsQuery
