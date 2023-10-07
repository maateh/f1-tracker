// icons
import EventIcon from '@mui/icons-material/Event'
import TimerIcon from '@mui/icons-material/Timer'

// styles
import './ScheduleInfo.css'

const ScheduleInfo = ({ title, sessions }) => {
  return (
    <div className="schedule-info">
      <h3 className="weekend-title">{title}</h3>

      <div className="weekend-date icon__container">
        <EventIcon />
        <span>
          {sessions.practices && sessions.practices.length 
            ? `${sessions.practices[0].getFormattedDate('MMM. dd.')} - `
            : ''
          }
          {sessions.race.getFormattedDate('MMM. dd.')}
        </span>
      </div>

      {sessions.race.time && (
        <div className="weekend-race-time icon__container">
          <TimerIcon />
          <span>
            {sessions.race.getFormattedDate('HH:mm')}
          </span>
        </div>
      )}
    </div>
  )
}

export default ScheduleInfo
