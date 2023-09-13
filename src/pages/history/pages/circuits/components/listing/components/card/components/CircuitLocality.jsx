import { Link } from "react-router-dom"

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation'

// styles
import '../CircuitCard.css'

const CircuitLocality = ({ circuit }) => {
  return (
    <Link
      className="circuit-locality icon__container"
      onClick={e => e.stopPropagation()}
      to={circuit.getMapsLink()}
    >
      <MyLocationIcon fontSize='small' />
      <span>{circuit.location.country}, {circuit.location.locality}</span>
    </Link>
  )
}

export default CircuitLocality
