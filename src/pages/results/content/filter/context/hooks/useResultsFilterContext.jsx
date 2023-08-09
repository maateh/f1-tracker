import { useContext } from "react"

// context
import { ResultsFilterContext } from "../ResultsFilterContext"

// models
import ContextError from "../../../../../../model/error/ContextError"

export const useResultsFilterContext = () => {
  const context = useContext(ResultsFilterContext)

  if (!context) {
    throw new ContextError('ResultsFilterContext')
  }
  
  return context
}
