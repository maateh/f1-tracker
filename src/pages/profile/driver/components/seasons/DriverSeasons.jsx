// components
import DriverSeasonsListing from "./components/listing/DriverSeasonsListing"
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useDriverSeasonsListingParser from "./hooks/useDriverSeasonsListingParser"

// context
import ListingContextProvider from "../../../../../components/listing/context/ListingContext"

const DriverSeasons = () => {
  const { cards } = useDriverSeasonsListingParser()

  return (
    <section className="driver-seasons__container">
      {!cards ? (
        <LoadingHandler
          isLoading={!cards}
        />
      ) : (
        <ListingContextProvider initialState={{ cards }}>
          <DriverSeasonsListing />
        </ListingContextProvider>
      )}
    </section>
  )
}

export default DriverSeasons
