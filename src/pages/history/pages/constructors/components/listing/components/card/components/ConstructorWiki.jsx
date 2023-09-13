import { Link } from "react-router-dom"

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import '../ConstructorCard.css'

const ConstructorWiki = ({ link }) => {
  return (
    <Link
      className="constructor-wiki__link icon__container"
      onClick={e => e.stopPropagation()}
      to={link}
    >
      <LaunchIcon fontSize='small' />
      <span>Wikipedia</span>
    </Link>
  )
}

export default ConstructorWiki
