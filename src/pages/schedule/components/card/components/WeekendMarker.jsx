// components
import { Tooltip } from "@mui/material"

// icons
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

const WeekendMarker = ({ weekend, nextRound }) => {
  const { title, status, icon } = weekend.isActive() ? {
    title: "Weekend is currently underway",
    status: 'active',
    icon: <PlayCircleOutlineIcon />
  } : weekend.round === nextRound ? {
    title: "Weekend will start soon...",
    status: 'next',
    icon: <HourglassTopIcon />
  } : weekend.isOver() ? {
    title: "Weekend is over",
    status: 'over',
    icon: <EventAvailableIcon />
  } : {
    title: "Weekend hasn't started yet",
    status: 'remaining',
    icon: <HourglassEmptyIcon />
  }

  return (
    <div className={`weekend-marker ${status}`}>
      <Tooltip title={title} arrow>
        {icon}
      </Tooltip>
    </div>
  )
}

export default WeekendMarker
