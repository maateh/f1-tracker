import { useContext } from "react"

// context
import { ConstructorsFilterContext } from "../ConstructorsFilterContext"

// models
import ContextError from "../../../../../../../../model/error/ContextError"

export const useConstructorsFilterContext = () => {
  const context = useContext(ConstructorsFilterContext)

  if (!context) {
    throw new ContextError('ConstructorsFilterContext')
  }
  
  return context
}
