// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"
import { useRoundsQuery } from "./useRoundsQuery"
import { useDriversQuery } from "./useDriversQuery"

export const useLapsFilterQueries = () => {
  const { selectors } = useLapsFilterContext()
  
  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()
  const { isLoading: roundsLoading, error: roundsError } = useRoundsQuery()
  const { isLoading: driversLoading, error: driversError } = useDriversQuery()

  return { 
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading || roundsLoading || driversLoading,
    error: seasonsError || roundsError || driversError
  }
}
