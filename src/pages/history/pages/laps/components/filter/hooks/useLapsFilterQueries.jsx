// context
import useFilterContext from "../../../../../../../components/filter/context/hooks/useFilterContext"

// hooks
import useSeasonsQuery from "./useSeasonsQuery"
import useRoundsQuery from "./useRoundsQuery"
import useDriversQuery from "./useDriversQuery"

const useLapsFilterQueries = () => {
  const { selectors } = useFilterContext()
  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()
  const { isLoading: roundsLoading, error: roundsError } = useRoundsQuery()
  const { isLoading: driversLoading, error: driversError } = useDriversQuery()

  return { 
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading || roundsLoading || driversLoading,
    error: seasonsError || roundsError || driversError
  }
}

export default useLapsFilterQueries
