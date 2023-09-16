import { useContext } from "react"

// context
import { ListingContext } from "../ListingContext"

// models
import ContextError from "../../../../model/error/ContextError"

const useListingContext = () => {
  const context = useContext(ListingContext)

  if (!context) {
    throw new ContextError('ListingContext')
  }
  
  return context
}

export default useListingContext
