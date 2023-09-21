// components
import Cards from "../../../../../../../components/listing/cards/Cards"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

const ConstructorSeasonsListing = () => {
  const { cards } = useListingContext()

  return (
    <div className="constructor-seasons-listing__container">
      <Cards cards={cards} />
    </div>
  )
}

export default ConstructorSeasonsListing
