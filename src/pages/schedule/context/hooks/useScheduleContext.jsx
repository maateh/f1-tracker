import { useContext } from "react"

// context
import { ScheduleContext } from "../ScheduleContext"

// model
import ContextError from "../../../../model/error/ContextError"

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext)

  if (!context) {
    throw new ContextError('ScheduleContext')
  }

  return context
}