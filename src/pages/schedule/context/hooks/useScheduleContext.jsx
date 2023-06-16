import { useContext } from "react"

// context
import { ScheduleContext } from "../ScheduleContext"

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext)

  if (!context) {
    throw new Error('useScheduleContext must be inside a ScheduleContextProvider')
  }

  return context
}