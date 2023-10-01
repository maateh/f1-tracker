// components
import DriverSeasonsListing from "./components/listing/DriverSeasonsListing"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"

// hooks
import useDriverSeasonsListing from "./hooks/useDriverSeasonsListing"

// context
import ListingContextProvider from "../../../../../../components/listing/context/ListingContext"

// styles
import './DriverSeasons.css'

const DriverSeasons = () => {
  const { title, cards } = useDriverSeasonsListing()

  return (
    <section className="driver-seasons__container">
      {cards ? (
        <ListingContextProvider initialState={{ title, cards }}>
          <DriverSeasonsListing />
        </ListingContextProvider>
      ) : (
        <ListingSkeleton
          titleFallback={title.main}
          cardsCounter={9}
        />
      )}
    </section>
  )
}

export default DriverSeasons
