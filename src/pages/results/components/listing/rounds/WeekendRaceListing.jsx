// hooks
import useWeekendRaceQuery from "./hooks/useWeekendRaceQuery"

// components
import Listing from "../../../../../components/listing/Listing"

const WeekendRaceListing = () => {
  const {
    data: listing,
    isLoading: loading,
    isError,
    error
  } = useWeekendRaceQuery()

  return (
    <Listing
      listing={listing}
      loading={loading}
      isError={isError}
      error={error}
    />
  )
}

export default WeekendRaceListing
