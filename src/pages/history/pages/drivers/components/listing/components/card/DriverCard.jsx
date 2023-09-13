import { Link, useNavigate } from 'react-router-dom'

// icons
import CakeIcon from '@mui/icons-material/Cake'
import PublicIcon from '@mui/icons-material/Public'
import LaunchIcon from '@mui/icons-material/Launch'

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
      
      <div className="driver-date-of-birth icon__container">
        <CakeIcon fontSize='small' />
        <span>{driver.formattedDateOfBirth}</span>
      </div>

      <div className="driver-nationality icon__container">
        <PublicIcon fontSize='small' />
        <span>{driver.nationality}</span>
      </div>

      <Link
        className="driver-wiki__link icon__container"
        onClick={e => e.stopPropagation()}
        to={driver.wiki}
      >
        <LaunchIcon fontSize='small' />
        <span>Wikipedia</span>
      </Link>
    </li>
  )
}

export default DriverCard
