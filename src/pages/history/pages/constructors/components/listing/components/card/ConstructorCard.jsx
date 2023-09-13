import { Link, useNavigate } from 'react-router-dom'

// icons
import PublicIcon from '@mui/icons-material/Public'
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './ConstructorCard.css'

const ConstructorCard = ({ constructor, lastRef }) => {
  const navigate = useNavigate()

  return (
    <li
      className="constructor-card__container"
      ref={lastRef || undefined}
      onClick={() => navigate(`/profile/constructor/${constructor.id}`)}
    >
      <h3 className="constructor-name">{constructor.name}</h3>
      
      <div className="constructor-nationality icon__container">
        <PublicIcon fontSize='small' />
        <span>{constructor.nationality}</span>
      </div>

      <Link
        className="constructor-wiki__link icon__container"
        onClick={e => e.stopPropagation()}
        to={constructor.wiki}
      >
        <LaunchIcon fontSize='small' />
        <span>Wikipedia</span>
      </Link>
    </li>
  )
}

export default ConstructorCard
