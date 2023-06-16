// context
import { useScheduleContext } from "../context/hooks/useScheduleContext"

// components
import WeekendList from "../weekend/WeekendList"

// styles
import './ScheduleInfo.css'

const ScheduleInfo = () => {
  const { schedule } = useScheduleContext()

  return (
    <div className="schedule-info">
      <h2 className="season">{schedule.year}</h2>
      <WeekendList />
    </div>
  )
}

export default ScheduleInfo