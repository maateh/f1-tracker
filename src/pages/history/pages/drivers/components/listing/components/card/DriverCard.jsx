import { useNavigate } from 'react-router-dom'

// components
import DriverName from './components/DriverName'
import DriverDateOfBirth from './components/DriverDateOfBirth'
import DriverNationality from './components/DriverNationality'
import DriverWiki from './components/DriverWiki'

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
      <DriverName name={driver.fullName} number={driver.formattedNumber} />
      <DriverDateOfBirth dateOfBirth={driver.formattedDateOfBirth} />
      <DriverNationality nationality={driver.nationality} />
      <DriverWiki link={driver.wiki} />
    </li>
  )
}

export default DriverCard
