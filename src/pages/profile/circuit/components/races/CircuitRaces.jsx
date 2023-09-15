// components
import Cards from '../../../../../components/listing/cards/Cards'
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

// hooks
import useCircuitRacesQuery from "./hooks/useCircuitRacesQuery"

// context
import useCircuitProfileContext from "../../context/hooks/useCircuitProfileContext"

// styles
import './CircuitRaces.css'

const CircuitRaces = () => {
  const { cards } = useCircuitProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useCircuitRacesQuery()

  return isLoading || isError || !cards ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="circuit-races__container">
      <Cards cards={cards} />
    </section>
  )
}

export default CircuitRaces
