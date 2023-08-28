// hooks
import useDriverStandingsQuery from "./hooks/useDriverStandingsQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const DriverStandingsListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriverStandingsQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default DriverStandingsListing
