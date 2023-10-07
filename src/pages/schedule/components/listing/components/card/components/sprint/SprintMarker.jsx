// components
import Tooltip from '@mui/material/Tooltip'

// icons
import FlashOnIcon from '@mui/icons-material/FlashOn'
import TimerIcon from '@mui/icons-material/Timer'
import TimerOffIcon from '@mui/icons-material/TimerOff'

// styles
import './SprintMarker.css'

const WeekendSprint = ({ sprint }) => {
	return sprint && (
    <Tooltip
      placement="top"
      followCursor={true}
      arrow
      title={
        sprint.race.time ? (
          <>
            <div className="icon__container">
              <TimerIcon />
              <span className="sprint-time">
                {sprint.qualifying.getFormattedDate('HH:mm')}
              </span>

              <FlashOnIcon />
              <span className="sprint-time">
                {sprint.race.getFormattedDate('HH:mm')}
              </span>
            </div>
          </>
        ) : (
          <div className="icon__container">
            <TimerOffIcon />
            <span className="sprint-time">
              Date information not available!
            </span>
          </div>
        )
      }
    >
      <div className="sprint-marker icon__container">
        <span>Sprint weekend!</span>
        <FlashOnIcon />
      </div>
    </Tooltip>
  )
}

export default WeekendSprint
