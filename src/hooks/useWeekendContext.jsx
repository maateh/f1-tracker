import { useContext } from "react"
import { WeekendContext } from "../context/WeekendContext"

export const useWeekendContext = () => {
  const context = useContext(WeekendContext)
  
  if (!context) {
    throw new Error('useWeekendContext must be inside an WeekendContextProvider')
  }
  
  return context
}
