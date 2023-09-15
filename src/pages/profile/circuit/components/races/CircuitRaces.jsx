// components
import Cards from '../../../../../components/listing/cards/Cards'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

// hooks
import useCircuitRacesQuery from "./hooks/useCircuitRacesQuery"
import useObserver from '../../../../../components/listing/cards/hooks/useObserver'

// context
import useCircuitProfileContext from "../../context/hooks/useCircuitProfileContext"

// styles
import './CircuitRaces.css'

const CircuitRaces = () => {
  const { cards } = useCircuitProfileContext()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useCircuitRacesQuery()

  const lastRef = useObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  })

  return (
    <section className="circuit-races__container">
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
    </section>
  )
}

export default CircuitRaces
