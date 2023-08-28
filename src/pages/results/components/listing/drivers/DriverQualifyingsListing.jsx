// hooks
import useDriverQualifyingsQuery from "./hooks/useDriverQualifyingsQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const DriverQualifyingListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useDriverQualifyingsQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default DriverQualifyingListing
