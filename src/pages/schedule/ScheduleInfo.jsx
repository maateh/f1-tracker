// components
import WeekendList from "./weekend/WeekendList"

// model
import Schedule from "../../model/schedule/Schedule"

// styles
import './ScheduleInfo.css'

const ScheduleInfo = ({ data }) => {
  const schedule = new Schedule(data)
  
  // console.log('SCHEDULE: ', schedule)
  return (
    <div className="schedule-info">
      <h2 className="season">{schedule.year}</h2>
      {schedule.weekends && <WeekendList weekends={schedule.weekends} />}
    </div>
  )
}

export default ScheduleInfo