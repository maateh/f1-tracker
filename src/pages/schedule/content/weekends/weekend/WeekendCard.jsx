import { Link } from "react-router-dom"

const WeekendCard = ({ weekend }) => {
  return (
    <div className="weekend-card">
      <p className="round">Round: {weekend.round}</p>
      <p className="name">{weekend.name}</p>
      <Link to={`/results/${weekend.year}/${weekend.round}/summary`}>More Info</Link>
    </div>
  )
}

export default WeekendCard