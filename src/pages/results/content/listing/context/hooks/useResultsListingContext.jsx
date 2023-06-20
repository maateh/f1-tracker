import { useContext } from "react"
import { ResultsListingContext } from "../ResultsListingContext"

export const useResultsListingContext = () => {
   const context = useContext(ResultsListingContext)

   if (!context) {
    throw Error('useResultsListingContext must be inside a ResultsListingContextProvider')
   }

   return context
}