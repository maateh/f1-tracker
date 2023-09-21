// components
import DriverSeasonsListing from "./components/listing/DriverSeasonsListing"
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useDriverSeasonsListing from "./hooks/useDriverSeasonsListing"

// context
import ListingContextProvider from "../../../../../components/listing/context/ListingContext"

// styles
import './DriverSeasons.css'

const DriverSeasons = () => {
  const { title, cards } = useDriverSeasonsListing()

  return (
    <section className="driver-seasons__container">
      {!cards ? (
        <LoadingHandler
          isLoading={!cards}
        />
      ) : (
        <ListingContextProvider initialState={{ title, cards }}>
          <DriverSeasonsListing />
        </ListingContextProvider>
      )}
    </section>
  )
}

export default DriverSeasons
