// context
import { useCircuitsFilterContext } from "../context/hooks/useCircuitsFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"

export const useCircuitsFilterQueries = () => {
  const { selectors } = useCircuitsFilterContext()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading,
    error: seasonsError
  }
}
