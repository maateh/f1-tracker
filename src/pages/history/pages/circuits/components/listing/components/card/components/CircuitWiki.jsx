import { Link } from 'react-router-dom'

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import '../CircuitCard.css'

const CircuitWiki = ({ link }) => {
  return (
    <Link
      className="circuit-wiki__link icon__container"
      onClick={e => e.stopPropagation()}
      to={link}
    >
      <LaunchIcon fontSize='small' />
      <span>Wikipedia</span>
    </Link>
  )
}

export default CircuitWiki
