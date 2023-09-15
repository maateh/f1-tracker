// styles
import './CircuitRaceCard.css'

const CircuitRaceCard = ({ weekend }) => {
  return (
    <div className="circuit-race__card">
      <h4>{weekend.name}</h4>
      <p>Season: {weekend.year}</p>
      <p>Round: {weekend.round}</p>
    </div>
  )
}

export default CircuitRaceCard
