import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// hooks
import useIdsFilterQuery from "./useIdsFilterQuery"
import useSeasonsFilterQuery from "../../../../../components/filter/hooks/useSeasonsFilterQuery"

// context
import useFilterContext from "../../../../../components/filter/context/hooks/useFilterContext"

// models
import FilterSelectorModel from "../../../../../model/filter/FilterSelector"
import FilterModel from "../../../../../model/filter/Filter"
import FilterOptionModel from "../../../../../model/filter/FilterOption"

const useResultsFilterQueries = () => {
  const { selectors, setStandings, setSessions } = useFilterContext()
  const { standings, session } = useParams()
  const navigate = useNavigate()

  const { isLoading: seasonsLoading } = useSeasonsFilterQuery({
    onChange: (value, { standings }) => {
      const pathname = `./${value}/${standings}/${FilterOptionModel.ALL.value}`
      navigate({ pathname }, { replace: true })
    }
  })
  const { isLoading: idsLoading } = useIdsFilterQuery()

  useEffect(() => {
    selectors.standings || loadStandings(navigate, standings, setStandings)
    selectors.sessions || loadSessions(navigate, session, setSessions)
  }, [navigate, standings, session, setStandings, setSessions, selectors.standings, selectors.sessions])
  
  return {
    preloading: 
      Object.values(selectors).some(s => !s) || 
      selectors.standings.param !== selectors.ids.filter.key,
    loading: seasonsLoading || idsLoading
  }
}

const loadStandings = (navigate, standings, setStandings) => setStandings({
  standings: new FilterSelectorModel({
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

const loadSessions = (navigate, session, setSessions) => setSessions({
  sessions: new FilterSelectorModel({
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
