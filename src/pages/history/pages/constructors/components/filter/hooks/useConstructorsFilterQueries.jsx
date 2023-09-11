// context
import { useConstructorsFilterContext } from "../context/hooks/useConstructorsFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"

export const useConstructorsFilterQueries = () => {
  const { selectors } = useConstructorsFilterContext()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading,
    error: seasonsError
  }
}
