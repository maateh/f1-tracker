// context
import useFilterContext from "../context/hooks/useFilterContext"

const useFilterQueries = (queries) => {
  const { selectors } = useFilterContext()
  const results = queries.map(query => query())

  return {
    preloading: Object.values(selectors).some(s => !s),
    loading: results.some(r => r.isLoading),
    error: results.some(r => r.isError)
  }
}

export default useFilterQueries
