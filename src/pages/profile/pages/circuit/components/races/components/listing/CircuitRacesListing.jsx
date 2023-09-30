// components
import Cards from "../../../../../../../../components/listing/cards/Cards"
import CardsSkeleton from "../../../../../../../../components/skeletons/listing/cards/CardsSkeleton"
import LoadingSkeleton from "../../../../../../../../components/skeletons/loading/LoadingSkeleton"

// hooks
import useCircuitRacesListingQuery from "./hooks/useCircuitRacesListingQuery"
import useObserver from "../../../../../../../../components/listing/cards/hooks/useObserver"

// context
import useListingContext from '../../../../../../../../components/listing/context/hooks/useListingContext'

const CircuitRacesListing = () => {
  const { cards } = useListingContext()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCircuitRacesListingQuery()

  const lastRef = useObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  })

  return (
    <div className="circuit-races-listing__container">
      {cards && data ? (
        <Cards
          cards={cards}
          lastIndex={data.pages[data.pages.length - 1].limit}
          lastRef={lastRef}
        />
      ) : (
        <CardsSkeleton counter={9} />
      )}

      {isFetchingNextPage && (
				<LoadingSkeleton linear={true} />
			)}
    </div>
  )
}
export default CircuitRacesListing