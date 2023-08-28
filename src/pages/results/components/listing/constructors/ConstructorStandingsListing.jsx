// hooks
import useConstructorStandingsQuery from "./hooks/useConstructorStandingsQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const ConstructorStandingsListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useConstructorStandingsQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default ConstructorStandingsListing
