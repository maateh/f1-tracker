// hooks
import { useScheduleQuery } from "./hooks/useScheduleQuery"

// components
import Listing from "../../../../components/listing/Listing"

const ScheduleListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useScheduleQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default ScheduleListing
