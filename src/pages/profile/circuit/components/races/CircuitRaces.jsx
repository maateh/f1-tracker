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
      <LoadingHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {cards && (
        <Cards
          cards={cards}
          // lastIndex={}
          // lastRef={}
        />
      )}
    </section>
  )
}

export default CircuitRaces
