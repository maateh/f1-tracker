import { useNavigate } from 'react-router-dom'

// components
import CircuitName from './components/CircuitName'
import CircuitLocality from './components/CircuitLocality'
import CircuitWiki from './components/CircuitWiki'

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
      <CircuitName name={circuit.name} />
      <CircuitLocality circuit={circuit} />
      <CircuitWiki link={circuit.wiki} />
    </li>
  )
}

export default CircuitCard
