import { Link } from "react-router-dom"

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import '../DriverCard.css'

const DriverWiki = ({ link }) => {
  return (
    <Link
      className="driver-wiki__link icon__container"
      onClick={e => e.stopPropagation()}
      to={link}
    >
      <LaunchIcon fontSize='small' />
      <span>Wikipedia</span>
    </Link>
  )
}

export default DriverWiki
