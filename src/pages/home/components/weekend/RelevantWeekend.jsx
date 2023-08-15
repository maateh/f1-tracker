// context
import { useWeekendContext } from "../../context/hooks/useWeekendContext"

const RelevantWeekend = () => {
  const { weekend } = useWeekendContext()

  return (
    <div className="relevant-weekend">
      <h2 className="title">{`${weekend.isActive() ? 'Current' : 'Next'} Weekend`}</h2>
      <p className="race">{weekend.name}</p>
      <p className="track">{weekend.circuit.name}</p>
      <p className="date">{weekend.sessions.race.getFormattedDate('yyyy.MM.dd')}</p>
      <p className="time">{weekend.sessions.race.getFormattedDate('HH:mm')}</p>
    </div>
  )
}

export default RelevantWeekend
