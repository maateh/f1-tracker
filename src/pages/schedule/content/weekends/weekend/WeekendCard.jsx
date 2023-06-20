import { useNavigate } from "react-router-dom"

const WeekendCard = ({ weekend }) => {
  const navigate = useNavigate()

  return (
    <div className="weekend-card">
      <p className="round">Round: {weekend.round}</p>
      <p className="name">{weekend.name}</p>
      <button className="btn" onClick={() => navigate(`/results`)}>More Info</button>
    </div>
  )
}

export default WeekendCard