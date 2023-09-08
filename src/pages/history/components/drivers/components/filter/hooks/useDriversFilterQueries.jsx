// context
import { useDriversFilterContext } from "../context/hooks/useDriversFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"

export const useDriversFilterQueries = () => {
  const { selectors } = useDriversFilterContext()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading,
    error: seasonsError
  }
}
