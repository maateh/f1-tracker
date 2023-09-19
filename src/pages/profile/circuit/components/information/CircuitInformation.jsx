import { Link } from "react-router-dom"

// components
import Linking from "../../../../../components/linking/Linking"
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useCircuitInformationQuery from "./hooks/useCircuitInformationQuery"

// context
import useCircuitProfileContext from "../../context/hooks/useCircuitProfileContext"

// constants
import { SIZE_LARGE } from "../../../../../components/linking/LinkingConstants"

// icons
import MapIcon from '@mui/icons-material/Map'

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
      <h2 className="circuit-name page__title">{circuit.name}</h2>

      <Linking
        text={circuit.getLocality()}
        tooltipText="Open on Maps"
        link={circuit.getMapsLink()}
        icon={<MapIcon />}
        size={SIZE_LARGE}
        launchIcon={true}
      />
    </section>
  )
}

export default CircuitInformation
