import { useNavigate } from "react-router-dom"

// model
import Schedule from "../../model/Schedule"

// styles
import './ScheduleInfo.css'

const ScheduleInfo = ({ data }) => {
  const navigate = useNavigate()
  const schedule = new Schedule(data)
  console.log('SCHEDULE: ', schedule)

  return (
    <div className="schedule-info__container">
      <p className="season">{schedule.season}</p>
      
      <div className="schedule__grid">
        {schedule.weekends && schedule.weekends.map((weekend) => (
          <div key={weekend.round} className="schedule-weekend__info">
            <p className="round">Round: {weekend.round}</p>
            <p className="name">{weekend.raceName}</p>
            <button className="btn" onClick={() => navigate(`/results`)}>More Info</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleInfo