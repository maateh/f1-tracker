import { useContext } from "react"

// context
import { SeasonSessionListingContext } from "../SeasonSessionListingContext"

export const useSeasonSessionListingContext = () => {
  const context = useContext(SeasonSessionListingContext)

  if (!context) {
    throw new Error('useSeasonSessionListingContext must be inside a SeasonSessionListingContextProvider')
  }

  return context
}