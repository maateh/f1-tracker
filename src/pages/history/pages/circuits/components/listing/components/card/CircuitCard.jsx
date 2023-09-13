import { Link, useNavigate } from 'react-router-dom'

// icons
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
        to={circuit.getMapsLink()}
        onClick={e => e.stopPropagation()}
      >
        <LaunchIcon fontSize='small' />
        <span>{circuit.location.country}, {circuit.location.locality}</span>
      </Link>
    </li>
  )
}

export default CircuitCard
