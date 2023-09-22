// components
import Linking from "../../../../../components/linking/Linking"
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useCircuitInformationQuery from "./hooks/useCircuitInformationQuery"

// context
import useCircuitProfileContext from "../../context/hooks/useCircuitProfileContext"

// constants
import { LINKING_SIZE_MEDIUM } from "../../../../../components/linking/LinkingConstants"

// icons
import InfoIcon from '@mui/icons-material/Info'
import MapIcon from '@mui/icons-material/Map'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './CircuitInformation.css'

const CircuitInformation = () => {
  const { circuit, racesAmount } = useCircuitProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useCircuitInformationQuery()

  return isLoading || isError || !circuit || !racesAmount ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="circuit-information__container">
      <h2 className="circuit-name page__title">{circuit.name}</h2>
      
      <p className="circuit-races-amount icon__container">
        <InfoIcon />
        <span>
          Total of <span className="highlight">{racesAmount}</span> races at this track so far!
        </span>
      </p>

      <div className="links__container">
        <Linking
          text={circuit.getLocality()}
          tooltipText="Open on Maps"
          link={circuit.getMapsLink()}
          icon={<MapIcon />}
          size={LINKING_SIZE_MEDIUM}
          launchIcon={true}
        />

        <Linking
          text='Wikipedia page'
          tooltipText="Go to the Wikipedia page"
          link={circuit.wiki}
          icon={<PublicIcon />}
          size={LINKING_SIZE_MEDIUM}
          launchIcon={true}
        />
      </div>
    </section>
  )
}

export default CircuitInformation
