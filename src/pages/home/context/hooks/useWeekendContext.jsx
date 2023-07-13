import { useContext } from "react"

// context
import { WeekendContext } from "../WeekendContext"

// model
import ContextError from "../../../../model/error/ContextError"

export const useWeekendContext = () => {
  const context = useContext(WeekendContext)

  if (!context) {
    throw new ContextError('WeekendContext')
  }

  return context
}