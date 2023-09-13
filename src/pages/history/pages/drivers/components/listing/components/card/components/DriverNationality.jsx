// icons
import PublicIcon from '@mui/icons-material/Public'

// styles
import '../DriverCard.css'

const DriverNationality = ({ nationality }) => {
  return (
    <div className="driver-nationality icon__container">
      <PublicIcon fontSize='small' />
      <span>{nationality}</span>
    </div>
  )
}

export default DriverNationality
