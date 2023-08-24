// icons
import EventIcon from '@mui/icons-material/Event'

const WeekendDate = ({ sessions }) => {
  return (
    <div className="weekend-date icon__container">
      <EventIcon />
      <span>
        {sessions.practices &&
          `${sessions.practices[0]?.getFormattedDate('MMM. dd.')} - `}
        {sessions.race.getFormattedDate('MMM. dd.')}
      </span>
    </div>
  )
}

export default WeekendDate
