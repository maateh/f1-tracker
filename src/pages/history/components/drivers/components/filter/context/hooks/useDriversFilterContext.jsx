import { useContext } from "react"

// context
import { DriversFilterContext } from "../DriversFilterContext"

// models
import ContextError from "../../../../../../../../model/error/ContextError"

export const useDriversFilterContext = () => {
  const context = useContext(DriversFilterContext)

  if (!context) {
    throw new ContextError('DriversFilterContext')
  }
  
  return context
}
