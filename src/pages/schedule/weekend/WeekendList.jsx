import { useNavigate } from 'react-router-dom'

// hooks
import { useScheduleContext } from '../context/hooks/useScheduleContext'

// styles
import './WeekendList.css'

const WeekendList = () => {
  const { schedule: { weekends } } = useScheduleContext()
  const navigate = useNavigate()

  return (
    <div className="weekend-list">
      {weekends.map(weekend => (
        <div className="card" key={weekend.round}>
          <p className="round">Round: {weekend.round}</p>
          <p className="name">{weekend.name}</p>
          <button className="btn" onClick={() => navigate(`/results`)}>More Info</button>
        </div>
      ))}
    </div>
  )
}
export default WeekendList