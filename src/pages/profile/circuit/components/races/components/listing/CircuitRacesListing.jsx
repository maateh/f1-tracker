// components
import Cards from "../../../../../../../components/listing/cards/Cards"
import LoadingHandler from "../../../../../../../components/loading/LoadingHandler"

// hooks
import useCircuitRacesListingQuery from "./hooks/useCircuitRacesListingQuery"
import useObserver from "../../../../../../../components/listing/cards/hooks/useObserver"

// context
import useListingContext from '../../../../../../../components/listing/context/hooks/useListingContext'

const CircuitRacesListing = () => {
  const { cards } = useListingContext()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useCircuitRacesListingQuery()

  const lastRef = useObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  })

  return (
    <div className="circuit-races-listing__container">
      {cards && data && (
        <Cards
          cards={cards}
          lastIndex={data.pages[data.pages.length - 1].limit}
          lastRef={lastRef}
        />
      )}

      <LoadingHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  )
}
export default CircuitRacesListing