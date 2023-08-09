// context
import { useScheduleFilterContext } from "../context/hooks/useScheduleFilterContext"

// hooks
import { useSeasonsQuery } from "./useSeasonsQuery"

export const useScheduleFilterQueries = () => {
  const { selectors } = useScheduleFilterContext()

  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading,
    error: seasonsError
  }
}
