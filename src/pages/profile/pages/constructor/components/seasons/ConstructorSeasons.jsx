// components
import ConstructorSeasonsListing from "./components/listing/ConstructorSeasonsListing"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"

// hooks
import useConstructorSeasonsListing from "./hooks/useConstructorSeasonsListing"

// context
import ListingContextProvider from "../../../../../../components/listing/context/ListingContext"

// styles
import './ConstructorSeasons.css'

const ConstructorSeasons = () => {
  const { title, cards } = useConstructorSeasonsListing()

  return (
    <section className="constructor-seasons__container">
      {title && cards ? (
        <ListingContextProvider initialState={{ title, cards }}>
          <ConstructorSeasonsListing />
        </ListingContextProvider>
      ) : (
        <ListingSkeleton
          titleRequired={true}
          cardsCounter={9}
        />
      )}
    </section>
  )
}

export default ConstructorSeasons
