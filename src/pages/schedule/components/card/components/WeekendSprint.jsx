// components
import { Tooltip } from "@mui/material"

// icons
import FlashOnIcon from '@mui/icons-material/FlashOn'

const WeekendSprint = ({ sessions }) => {
  return sessions.sprint && (
    <Tooltip title="Click for the details" arrow>
      <div className="weekend-sprint-info icon__container">
        <span>Sprint weekend!</span>
        <FlashOnIcon />

        {/* {weekend.sessions.sprint.race.time && (
          <div className="icon__container">
            <TimerIcon />
            <span className="sprint-time">
              {weekend.sessions.sprint.qualifying.getFormattedDate('HH:mm')}
            </span>

            <FlashOnIcon />
            <span className="sprint-time">
              {weekend.sessions.sprint.race.getFormattedDate('HH:mm')}
            </span>
          </div>
        )} */}
      </div>
    </Tooltip>
  )
}

export default WeekendSprint
