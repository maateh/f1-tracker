import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { CARD_COLOR_SECONDARY, CARD_COLOR_YELLOW, CARD_SIZE_MEDIUM } from '../../../../../../../../components/listing/cards/card/CardConstants'
import { LINKING_POS_BOTTOM_LEFT, LINKING_SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

// icons
import CakeIcon from '@mui/icons-material/Cake'
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './DriverCard.css'

const DriverCard = ({ driver, lastRef }) => {
  const navigate = useNavigate()

  return (
    <Card
      tooltipText="Open Driver's Profile"
      size={CARD_SIZE_MEDIUM}
      bgColor={CARD_COLOR_SECONDARY}
      borderColor={CARD_COLOR_YELLOW}
      invertOnHover={true}
      onClick={() => navigate(`/profile/driver/${driver.id}`)}
      lastRef={lastRef}
    >
      <h3 className="driver-name">{driver.fullName} {driver.formattedNumber}</h3>
      <p className="driver-date-of-birth icon__container">
        <CakeIcon fontSize='small' />
        <span>{driver.formattedDateOfBirth}</span>
      </p>
      <p className="driver-nationality icon__container">
        <FlagIcon fontSize='small' />
        <span>{driver.nationality}</span>
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

export default DriverCard
