import { useContext } from "react"

// context
import { ResultsFilterContext } from "../ResultsFilterContext"

export const useResultsFilterContext = () => {
  const context = useContext(ResultsFilterContext)
  
  if (!context) {
    throw new Error('useResultsFilterContext must be inside a ResultsFilterContextProvider')
  }
  
  return context
}
