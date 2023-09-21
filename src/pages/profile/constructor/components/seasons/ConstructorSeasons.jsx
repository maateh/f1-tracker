// components
import ConstructorSeasonsListing from "./components/listing/ConstructorSeasonsListing"
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorSeasonsListing from "./hooks/useConstructorSeasonsListing"

// context
import ListingContextProvider from "../../../../../components/listing/context/ListingContext"

const ConstructorSeasons = () => {
  const { cards } = useConstructorSeasonsListing()

  return (
    <section className="constructor-seasons__container">
      {!cards ? (
        <LoadingHandler
          isLoading={!cards}
        />
      ) : (
        <ListingContextProvider initialState={{ cards }}>
          <ConstructorSeasonsListing />
        </ListingContextProvider>
      )}
    </section>
  )
}

export default ConstructorSeasons
