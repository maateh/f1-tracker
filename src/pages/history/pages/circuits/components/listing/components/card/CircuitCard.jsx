import { useNavigate } from 'react-router-dom'

// components
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { POS_BOTTOM_LEFT, SIZE_MEDIUM, SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './CircuitCard.css'

const CircuitCard = ({ circuit, lastRef }) => {
  const navigate = useNavigate()

  return (
    <li
      className="circuit-card__container"
      ref={lastRef || undefined}
      onClick={() => navigate(`/profile/circuit/${circuit.id}`)}
    >
      <h3 className="circuit-name">{circuit.name}</h3>

      <Linking
        text={circuit.getLocality()}
        tooltipText="Open on Maps"
        link={circuit.getMapsLink()}
        icon={<MyLocationIcon />}
        launchIcon={true}
        size={SIZE_MEDIUM}
        darkMode={true}
      />

      <Linking
        text="Wikipedia"
        tooltipText="Go to the Wikipedia page"
        link={circuit.wiki}
        icon={<PublicIcon />}
        launchIcon={true}
        size={SIZE_SMALL}
        positioningClasses={POS_BOTTOM_LEFT}
        darkMode={true}
      />
    </li>
  )
}

export default CircuitCard
