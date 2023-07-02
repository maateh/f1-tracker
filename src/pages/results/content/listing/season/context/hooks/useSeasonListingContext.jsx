import { useContext } from "react"

// context
import { SeasonListingContext } from "../SeasonListingContext"

export const useSeasonListingContext = () => {
  const context = useContext(SeasonListingContext)

  if (!context) {
    throw new Error('useSeasonListingContext must be inside a SeasonListingContextProvider')
  }

  return context
}