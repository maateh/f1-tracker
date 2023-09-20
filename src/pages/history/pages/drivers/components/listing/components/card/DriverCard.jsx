import { useNavigate } from 'react-router-dom'

// components
import Linking from '../../../../../../../../components/linking/Linking'

// constants
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
    <li
      className="driver-card__container"
      ref={lastRef || undefined}
      onClick={() => navigate(`/profile/driver/${driver.id}`)}
    >
      <h3 className="driver-name">{driver.fullName} {driver.formattedNumber}</h3>
      <p className="driver-date-of-birth icon__container">
        <CakeIcon fontSize='small' />
        <span>{driver.dateOfBirth}</span>
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
    </li>
  )
}

export default DriverCard
