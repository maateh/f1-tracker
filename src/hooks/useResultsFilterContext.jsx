import { useContext } from "react"
import { ResultsFilterContext } from "../context/ResultsFilterContext"

export const useResultsFilterContext = () => {
  const context = useContext(ResultsFilterContext)
  
  if (!context) {
    throw new Error('useResultsFilterContext must be inside a ResultsFilterContextProvider')
  }
  
  return context
}
