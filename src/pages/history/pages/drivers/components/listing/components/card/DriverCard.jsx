import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { COLOR_SECONDARY, COLOR_YELLOW, MEDIUM_SIZE_CARD } from '../../../../../../../../components/listing/cards/card/CardConstants'
import { POS_BOTTOM_LEFT, SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

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
      size={MEDIUM_SIZE_CARD}
      bgColor={COLOR_SECONDARY}
      borderColor={COLOR_YELLOW}
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
        size={SIZE_SMALL}
        positioningClasses={POS_BOTTOM_LEFT}
        darkMode={true}
      />
    </Card>
  )
}

export default DriverCard
