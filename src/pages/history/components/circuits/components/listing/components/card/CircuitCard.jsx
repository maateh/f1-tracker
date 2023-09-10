import { Link } from 'react-router-dom'

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './CircuitCard.css'

const CircuitCard = ({ circuit, lastRef }) => {
  return (
    <li className="circuit-card__container" ref={lastRef ? lastRef : undefined}>
      <h3 className="circuit-name">{circuit.name}</h3>
      <Link
        className="circuit-locality icon__container"
        to={circuit.getMapsLink()}
      >
        <LaunchIcon fontSize='small' />
        <span>{circuit.location.country}, {circuit.location.locality}</span>
      </Link>
    </li>
  )
}

export default CircuitCard
