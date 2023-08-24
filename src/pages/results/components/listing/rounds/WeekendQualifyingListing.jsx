// hooks
import { useWeekendQualifyingQuery } from "./hooks/useWeekendQualifyingQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const WeekendQualifyingQuery = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useWeekendQualifyingQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default WeekendQualifyingQuery
