// components
import Cards from "../../../../../../../components/listing/cards/Cards"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

const DriverSeasonsListing = () => {
  const { cards } = useListingContext()

  return (
    <div className="driver-seasons-listing__container">
      <Cards cards={cards} />
    </div>
  )
}

export default DriverSeasonsListing
