// hooks
import useScheduleQuery from "./hooks/useScheduleQuery"

// components
import Listing from "../../../../components/listing/Listing"
import LoadingHandler from "../../../../components/loading/LoadingHandler"
import ScheduleTitle from "./components/title/ScheduleTitle"
import ListingCards from "../../../../components/listing/cards/ListingCards"

const ScheduleListing = () => {
  const {
    data: listing,
    isLoading,
    isError,
    error
  } = useScheduleQuery()

  return (
    <div className="listing__container">
      <LoadingHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {listing && (
        <>
          <ScheduleTitle />
          <ListingCards cards={listing.cards} />
        </>
      )}
    </div>
  )
}

export default ScheduleListing
