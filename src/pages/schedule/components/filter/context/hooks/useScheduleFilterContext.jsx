import { useContext } from "react"

// context
import { ScheduleFilterContext } from "../ScheduleFilterContext"

// models
import ContextError from "../../../../../../model/error/ContextError"

export const useScheduleFilterContext = () => {
  const context = useContext(ScheduleFilterContext)

  if (!context) {
    throw new ContextError('ScheduleFilterContext')
  }
  
  return context
}
