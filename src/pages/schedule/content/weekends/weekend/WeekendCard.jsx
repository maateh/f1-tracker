import { Link } from "react-router-dom"

// icons
import EventIcon from '@mui/icons-material/Event';
import TimerIcon from '@mui/icons-material/Timer'
import FlashOnIcon from '@mui/icons-material/FlashOn'

const WeekendCard = ({ weekend }) => {
  return (
    <div className="weekend-card">
      <p className="name">{weekend.name}</p>
      <div className="datetime-container">
        <EventIcon />
        <span className="weekend-date">{weekend.sessions?.practices[0].getFormattedDate('MM.dd.')} - {weekend.sessions?.race.getFormattedDate('MM.dd.')}</span>
      </div>

      <div className="datetime-container">
        <TimerIcon />
        <span className="race-time">{weekend.sessions?.race.getFormattedDate('HH:mm')}</span>
      </div>

      {weekend.sessions?.sprint && (
        <div className="sprint-container">
          <p className="sprint-warn">Sprint weekend!</p>
          <div className="datetime-container">
            <TimerIcon />
            <span className="sprint-time">{weekend.sessions?.sprint[0].getFormattedDate('HH:mm')}</span>

            <FlashOnIcon />
            <span className="sprint-time">{weekend.sessions?.sprint[1].getFormattedDate('HH:mm')}</span>
          </div>
        </div>
      )}

      <Link className="results-info" to={`/results/${weekend.year}/${weekend.round}/summary`}>Weekend results</Link>
      <Link className="wiki-info" to={weekend.wikiUrl}>More info</Link>

      <p className="round">#{weekend.round}</p>
    </div>
  )
}

export default WeekendCard
