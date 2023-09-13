import { Link, useNavigate } from 'react-router-dom'

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation'
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './CircuitCard.css'

const CircuitCard = ({ circuit, lastRef }) => {
  const navigate = useNavigate()

  return (
    <li
      className="circuit-card__container"
      ref={lastRef || undefined}
      onClick={() => navigate(`/profile/circuit/${circuit.id}`)}
    >
      <h3 className="circuit-name">{circuit.name}</h3>
      <Link
        className="circuit-locality icon__container"
        onClick={e => e.stopPropagation()}
        to={circuit.getMapsLink()}
      >
        <MyLocationIcon fontSize='small' />
        <span>{circuit.location.country}, {circuit.location.locality}</span>
      </Link>

      <Link
        className="circuit-wiki__link icon__container"
        onClick={e => e.stopPropagation()}
        to={circuit.wiki}
      >
        <LaunchIcon fontSize='small' />
        <span>Wikipedia</span>
      </Link>
    </li>
  )
}

export default CircuitCard
