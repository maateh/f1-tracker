import { useParams } from "react-router-dom"

// styles
import './ScheduleTitle.css'

const ScheduleTitle = () => {
  const { year } = useParams()

  return (
    <h2 className="schedule-title">{year}</h2>
  )
}

export default ScheduleTitle
