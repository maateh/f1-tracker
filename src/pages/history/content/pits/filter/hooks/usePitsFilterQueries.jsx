import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// context
import { usePitsFilterContext } from "../context/hooks/usePitsFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"
import { useRoundsQuery } from "./useRoundsQuery"
import { useIdsQuery } from "./useIdsQuery"

// models
import FilterSelectorModel from "../../../../../../model/filter/FilterSelector"
import FilterModel from "../../../../../../model/filter/Filter"
import FilterOptionModel from "../../../../../../model/filter/FilterOption"


export const usePitsFilterQueries = () => {
  const { selectors, dispatch } = usePitsFilterContext()
  const { types } = useParams()
  const navigate = useNavigate()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()
  const { isLoading: roundsLoading, error: roundsError } = useRoundsQuery()
  const { isLoading: idsLoading, error: idsError } = useIdsQuery()

  useEffect(() => {
    selectors.types || loadTypes(navigate, dispatch, types)
  }, [navigate, dispatch, types, selectors.types])

  return { 
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading || roundsLoading || idsLoading,
    error: seasonsError || roundsError || idsError
  }
}

const loadTypes = (navigate, dispatch, types) => dispatch({
  type: 'SET_TYPES',
  payload: new FilterSelectorModel({
    filter: new FilterModel({
      key: 'types',
      label: 'Types',
      options: [
        new FilterOptionModel({ value: 'drivers', label: 'Drivers' }),
        new FilterOptionModel({ value: 'constructors', label: 'Constructors' }),
      ]
    }),
    param: types || 'drivers',
    searchable: false,
    onChange: (value, { year, round }) => {
      const route = `./${year}/${round}/${value}/${FilterOptionModel.ALL.value}`
      navigate(route, { replace: true })
    }
  })
})
