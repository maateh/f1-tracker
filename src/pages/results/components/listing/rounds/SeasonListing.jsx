// hooks
import useSeasonQuery from "./hooks/useSeasonQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const SeasonListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useSeasonQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default SeasonListing
