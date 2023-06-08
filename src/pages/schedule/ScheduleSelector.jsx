import { useState } from "react"

// styles
import './ScheduleSelector.css'


const ScheduleSelector = ({ year, setYear }) => {
  const [value, setValue] = useState(year)

  const handleSelect = () => {
    setYear(value)
  }

  return (
    <div className="schedule-selector">
      <button className="btn" onClick={handleSelect}>Button</button>
    </div>
  )
}

export default ScheduleSelector