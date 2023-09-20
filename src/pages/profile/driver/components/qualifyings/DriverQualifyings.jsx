// components
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useDriverQualifyingsQuery from "./hooks/useDriverQualifyingsQuery"

// context
import useDriverProfileContext from "../../context/hooks/useDriverProfileContext"

// styles
import './DriverQualifyings.css'

const DriverQualifyings = () => {
  const { qualifyings } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverQualifyingsQuery()

  return isLoading || isError || !qualifyings ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-qualifyings__container">
      DriverQualifyings
    </section>
  )
}

export default DriverQualifyings
