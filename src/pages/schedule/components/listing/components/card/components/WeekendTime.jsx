// icons
import TimerIcon from '@mui/icons-material/Timer'

const WeekendTime = ({ race }) => {
  return race.time && (
    <div className="weekend-race-time icon__container">
      <TimerIcon />
      <span>
        {race.getFormattedDate('HH:mm')}
      </span>
    </div>
  )
}

export default WeekendTime
