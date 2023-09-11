import { useContext } from "react"

// context
import { CircuitsFilterContext } from "../CircuitsFilterContext"

// models
import ContextError from "../../../../../../../../model/error/ContextError"

export const useCircuitsFilterContext = () => {
  const context = useContext(CircuitsFilterContext)

  if (!context) {
    throw new ContextError('CircuitsFilterContext')
  }
  
  return context
}
