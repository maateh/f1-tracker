// components
import Title from "../../../../../../components/listing/title/Title"
import Cards from "../../../../../../components/listing/cards/Cards"
import ListingSkeleton from "../../../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

const DriverSeasonsListing = () => {
  const { title, cards } = useListingContext()

  return (
		<div className="listing__container">
			{!cards ? (
        <ListingSkeleton
          titleFallback={title.main}
          cardsCounter={6}
        />
      ) : (
				<>
					<Title title={title} />
					<Cards cards={cards} />
				</>
			)}
		</div>
  )
}

export default DriverSeasonsListing
