import { Link } from "react-router-dom"

// components
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useCircuitInformationQuery from "./hooks/useCircuitInformationQuery"

// context
import useCircuitProfileContext from "../../context/hooks/useCircuitProfileContext"

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './CircuitInformation.css'

const CircuitInformation = () => {
  const { circuit } = useCircuitProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useCircuitInformationQuery()

  return isLoading || isError || !circuit ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="circuit-information__container">
      <h2 className="circuit-name">{circuit.name}</h2>
      <Link
        className="circuit-locality icon__container"
        to={circuit.getMapsLink()}
      >
        <LaunchIcon fontSize='small' />
        <span>{circuit.getLocality()}</span>
      </Link>
    </section>
  )
}

export default CircuitInformation
