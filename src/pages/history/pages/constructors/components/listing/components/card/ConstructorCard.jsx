import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../components/listing/cards/components/card/Card'
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { CARD_COLOR_ORANGE, CARD_COLOR_SECONDARY, CARD_SIZE_MEDIUM } from '../../../../../../../../components/listing/cards/components/card/constants/CardConstants'
import { LINKING_POS_BOTTOM_LEFT, LINKING_SIZE_SMALL } from '../../../../../../../../components/linking/constants/LinkingConstants'

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './ConstructorCard.css'

const ConstructorCard = ({ constructor, lastRef }) => {
  const navigate = useNavigate()

  return (
    <Card
      tooltipText="Open Constructor's Profile"
      size={CARD_SIZE_MEDIUM}
      bgColor={CARD_COLOR_SECONDARY}
      borderColor={CARD_COLOR_ORANGE}
      invertOnHover={true}
      onClick={() => navigate(`/profile/constructor/${constructor.id}`)}
      lastRef={lastRef}
    >
      <h3 className="constructor-name">{constructor.name}</h3>
      <p className="constructor-nationality icon__container">
        <FlagIcon fontSize='small' />
        <span>{constructor.nationality}</span>
      </p>

      <Linking
        text="Wikipedia"
        tooltipText="Go to the Wikipedia page"
        link={constructor.wiki}
        icon={<PublicIcon />}
        launchIcon={true}
        size={LINKING_SIZE_SMALL}
        positioningClasses={LINKING_POS_BOTTOM_LEFT}
        darkMode={true}
      />
    </Card>
  )
}

export default ConstructorCard
