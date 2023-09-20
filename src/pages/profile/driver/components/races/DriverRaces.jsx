// components
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useDriverRacesQuery from "./hooks/useDriverRacesQuery"

// context
import useDriverProfileContext from "../../context/hooks/useDriverProfileContext"

// styles
import './DriverRaces.css'

const DriverRaces = () => {
  const { races } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverRacesQuery()

  return isLoading || isError || !races ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-races__container">
      DriverRaces
    </section>
  )
}

export default DriverRaces
