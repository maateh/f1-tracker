// components
import Cards from "../../../../../../components/listing/cards/Cards"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const CircuitRacesListing = () => {
  const { cards } = useListingContext()
	
  return (
		<div className="listing__container">
			{!cards ? <ListingSkeleton cardsCounter={6} /> : (
				<>
					<Cards cards={cards} />
				</>
			)}
		</div>
  )
}

export default CircuitRacesListing
