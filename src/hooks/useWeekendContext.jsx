import { useContext } from "react"

// context
import { WeekendContext } from "../context/WeekendContext"

export const useWeekendContext = () => {
  const context = useContext(WeekendContext)

  if (!context) {
    throw new Error('useWeekendContext must be inside a WeekendContextProvider')
  }

  return context
}