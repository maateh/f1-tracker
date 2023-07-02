import { useContext } from "react"

// context
import { WeekendListingContext } from "../WeekendListingContext"

export const useWeekendListingContext = () => {
  const context = useContext(WeekendListingContext)

  if (!context) {
    throw new Error('useWeekendListingContext must be inside a WeekendListingContextProvider')
  }

  return context
}