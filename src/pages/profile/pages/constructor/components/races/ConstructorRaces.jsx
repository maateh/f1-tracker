// components
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorRacesQuery from "./hooks/useConstructorRacesQuery"

// context
import useConstructorProfileContext from "../../context/hooks/useConstructorProfileContext"

// styles
import './ConstructorRaces.css'

const ConstructorRaces = () => {
  const { races } = useConstructorProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useConstructorRacesQuery()

  return isLoading || isError || !races ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="constructor-races__container">
      ConstructorRaces
    </section>
  )
}

export default ConstructorRaces
