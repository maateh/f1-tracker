// icons
import CakeIcon from '@mui/icons-material/Cake'

// styles
import '../DriverCard.css'

const DriverDateOfBirth = ({ dateOfBirth }) => {
  return (
    <div className="driver-date-of-birth icon__container">
      <CakeIcon fontSize='small' />
      <span>{dateOfBirth}</span>
    </div>
  )
}

export default DriverDateOfBirth
