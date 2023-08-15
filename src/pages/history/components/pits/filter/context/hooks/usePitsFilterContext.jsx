import { useContext } from "react"

// context
import { PitsFilterContext } from "../PitsFilterContext"
import ContextError from "../../../../../../../model/error/ContextError"

export const usePitsFilterContext = () => {
  const context = useContext(PitsFilterContext)

  if (!context) {
    throw new ContextError('PitsFilterContext')
  }
  
  return context
}
