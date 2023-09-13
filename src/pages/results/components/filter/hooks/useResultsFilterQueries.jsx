import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// hooks
import useIdsQuery from "./useIdsQuery"
import useSeasonsQuery from "../../../../../components/filter/hooks/useSeasonsQuery"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"
import { SET_SESSIONS, SET_STANDINGS } from "../../../../../components/filter/context/FilterContextActions"

// models
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterModel from "../../../../../model/filter/Filter"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

const useResultsFilterQueries = () => {
  const { selectors, dispatch } = useFilterContext()
  const { standings, session } = useParams()
  const navigate = useNavigate()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery({
    onChange: (value, { standings }) => {
      const pathname = `./${value}/${standings}/${FilterOptionModel.ALL.value}`
      navigate({ pathname }, { replace: true })
    }
  })
  const { isLoading: idsLoading, error: idsError } = useIdsQuery()

  useEffect(() => {
    selectors.standings || loadStandings(navigate, dispatch, standings)
    selectors.sessions || loadSessions(navigate, dispatch, session)
  }, [navigate, dispatch, standings, session, selectors.standings, selectors.sessions])
  
  return {
    preloading: 
      Object.values(selectors).some(s => !s) || 
      selectors.standings.param !== selectors.ids.filter.key,
    loading: seasonsLoading || idsLoading,
    error: seasonsError || idsError
  }
}

const loadStandings = (navigate, dispatch, standings) => dispatch({
  type: SET_STANDINGS,
  payload: new FilterSelectorModel({
    filter: new FilterModel({
      key: 'standings',
      label: 'Standings',
      options: [
        new FilterOptionModel({ value: 'rounds', label: 'Rounds' }),
        new FilterOptionModel({ value: 'drivers', label: 'Drivers' }),
        new FilterOptionModel({ value: 'constructors', label: 'Constructors' }),
      ]
    }),
    param: standings,
    searchable: false,
    onChange: (value, { year }) => navigate(`./${year}/${value}/${FilterOptionModel.ALL.value}`, { replace: true }),
    enabled: () => true
  })
})

const loadSessions = (navigate, dispatch, session) => dispatch({
  type: SET_SESSIONS,
  payload: new FilterSelectorModel({
    filter: new FilterModel({
			key: 'sessions',
			label: 'Sessions',
			options: [
				new FilterOptionModel({ value: 'race', label: 'Race' }),
				new FilterOptionModel({ value: 'qualifying', label: 'Qualifying' }),
			]
		}),
    param: session || 'race',
    searchable: false,
    onChange: (value, { year, standings, id }) => navigate(`./${year}/${standings}/${id}/${value}`, { replace: true }),
    enabled: ({ standings, id }) => standings.match('^(drivers|rounds)$') && id !== 'all'
  })
})

export default useResultsFilterQueries
