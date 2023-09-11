import { useContext } from "react"

// context
import { LapsFilterContext } from "../LapsFilterContext"
import ContextError from "../../../../../../../../model/error/ContextError"

export const useLapsFilterContext = () => {
  const context = useContext(LapsFilterContext)

  if (!context) {
    throw new ContextError('LapsFilterContext')
  }
  
  return context
}
