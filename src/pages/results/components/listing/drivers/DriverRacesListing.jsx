// hooks
import useDriverRacesQuery from "./hooks/useDriverRacesQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const DriverRacesListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriverRacesQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default DriverRacesListing
