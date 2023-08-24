// hooks
import { useConstructorRacesQuery } from "./hooks/useConstructorRacesQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const ConstructorRacesListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useConstructorRacesQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default ConstructorRacesListing
