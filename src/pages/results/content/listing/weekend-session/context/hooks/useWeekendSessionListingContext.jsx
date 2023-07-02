import { useContext } from "react"

// context
import { WeekendSessionListingContext } from "../WeekendSessionListingContext"

export const useWeekendSessionListingContext = () => {
  const context = useContext(WeekendSessionListingContext)

  if (!context) {
    throw new Error('useWeekendSessionListingContext must be inside a WeekendSessionListingContextProvider')
  }

  return context
}