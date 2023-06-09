// styles
import './WeekendHeadline.css'

const WeekendHeadline = ({ weekend }) => {
  return (
    <div className="weekend-headline">
      <h2 className="title">{`${weekend.active ? 'Current' : 'Next'} Weekend`}</h2>
      <p className="race">{weekend.name}</p>
      <p className="track">{weekend.circuit.name}</p>
      <p className="date">{weekend.sessions.race.getFormattedDate('yyyy.MM.dd')}</p>
      <p className="time">{weekend.sessions.race.getFormattedDate('HH:mm')}</p>
    </div>
  )
}

export default WeekendHeadline