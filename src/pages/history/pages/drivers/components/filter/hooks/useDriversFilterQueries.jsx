// context
import useFilterContext from "../../../../../../../components/filter/context/hooks/useFilterContext"

// hooks
import useSeasonsQuery from "./useSeasonsQuery"

const useDriversFilterQueries = () => {
  const { selectors } = useFilterContext()
  const { isLoading: seasonsLoading, error: seasonsError } = useSeasonsQuery()

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: seasonsLoading,
    error: seasonsError
  }
}

export default useDriversFilterQueries
