// components
import WeekendList from "./weekend/WeekendList"

// model
import Schedule from "../../model/Schedule"

// styles
import './ScheduleInfo.css'

const ScheduleInfo = ({ data }) => {
  const schedule = new Schedule(data)
  
  // console.log('SCHEDULE: ', schedule)
  return (
    <div className="schedule-info">
      <h2 className="season">{schedule.season}</h2>
      <WeekendList weekends={schedule.weekends} />
    </div>
  )
}

export default ScheduleInfo