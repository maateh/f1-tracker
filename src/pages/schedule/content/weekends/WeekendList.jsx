// components
import WeekendCard from "./weekend/WeekendCard"

// context
import { useScheduleContext } from "../../context/hooks/useScheduleContext"

// styles
import './WeekendList.css'

const WeekendList = () => {
  const { schedule } = useScheduleContext()

  return (
    <div className="weekend-list__container">
      <h2 className="season-year">{schedule.year}</h2>

      <div className="weekend-list">
        {schedule.weekends.map(weekend => <WeekendCard key={weekend.round} weekend={weekend} />)}
      </div>
    </div>
  )
}

export default WeekendList