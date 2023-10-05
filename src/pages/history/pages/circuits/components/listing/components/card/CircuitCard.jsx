import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../components/listing/cards/components/card/Card'
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { CARD_COLOR_GREEN, CARD_COLOR_SECONDARY, CARD_SIZE_MEDIUM } from '../../../../../../../../components/listing/cards/components/card/constants/CardConstants'
import { LINKING_POS_BOTTOM_LEFT, LINKING_SIZE_MEDIUM, LINKING_SIZE_SMALL } from '../../../../../../../../components/linking/constants/LinkingConstants'

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
      size={CARD_SIZE_MEDIUM}
      bgColor={CARD_COLOR_SECONDARY}
      borderColor={CARD_COLOR_GREEN}
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
        size={LINKING_SIZE_MEDIUM}
        darkMode={true}
      />

      <Linking
        text="Wikipedia"
        tooltipText="Go to the Wikipedia page"
        link={circuit.wiki}
        icon={<PublicIcon />}
        launchIcon={true}
        size={LINKING_SIZE_SMALL}
        positioningClasses={LINKING_POS_BOTTOM_LEFT}
        darkMode={true}
      />
    </Card>
  )
}

export default CircuitCard
