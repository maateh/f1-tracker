// styles
import './CircuitRaceCard.css'

const CircuitRaceCard = ({ weekend, lastRef }) => {
  return (
    <li
      className="circuit-race__card"
      ref={lastRef || undefined}
    >
      <h3>{weekend.year}</h3>
      <p>Round: {weekend.round}</p>
      <p>{weekend.name}</p>
    </li>
  )
}

export default CircuitRaceCard
