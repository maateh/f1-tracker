import { useContext } from "react"

// context
import { FilterContext } from "../FilterContext"

// models
import ContextError from "../../../../model/error/ContextError"

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new ContextError('FilterContext')
  }
  
  return context
}
