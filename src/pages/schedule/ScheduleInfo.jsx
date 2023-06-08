// model
import Schedule from "../../model/Schedule"

// styles
import './ScheduleInfo.css'

const ScheduleInfo = ({ data }) => {
  console.log('SCHEDULE: ', data)
  const schedule = new Schedule(data)

  return (
    <div className="schedule-info__container">
      {schedule && <p className="season">Season: {schedule.season}</p>}
      
      {schedule.weekends && schedule.weekends.map((weekend) => (
        <div key={weekend.round} className="schedule-weekend">
          <p className="weekend-name">{weekend.raceName}</p>
        </div>
      ))}
    </div>
  )
}

export default ScheduleInfo