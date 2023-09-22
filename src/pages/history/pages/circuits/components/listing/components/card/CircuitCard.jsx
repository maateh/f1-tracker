import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { COLOR_GREEN, COLOR_SECONDARY, MEDIUM_SIZE_CARD } from '../../../../../../../../components/listing/cards/card/CardConstants'
import { POS_BOTTOM_LEFT, SIZE_MEDIUM, SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './CircuitCard.css'

const CircuitCard = ({ circuit, lastRef }) => {
  const navigate = useNavigate()

  return (
    <Card
      tooltipText="Open Circuit's profile"
      size={MEDIUM_SIZE_CARD}
      bgColor={COLOR_SECONDARY}
      borderColor={COLOR_GREEN}
      invertOnHover={true}
      onClick={() => navigate(`/profile/circuit/${circuit.id}`)}
      lastRef={lastRef}
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
    </Card>
  )
}

export default CircuitCard
