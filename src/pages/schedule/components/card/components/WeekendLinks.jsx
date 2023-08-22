import { Link } from 'react-router-dom'

// components
import Tooltip from '@mui/material/Tooltip'

// icons
import SegmentIcon from '@mui/icons-material/Segment'
import InfoIcon from '@mui/icons-material/Info'

const WeekendLinks = ({ weekend }) => {
  return weekend.sessions.race.isOver() && (
    <div className="weekend-links__container">
      <Tooltip title="Race results" arrow={true} disableInteractive={true}>
        <div className="icon__container">
          <SegmentIcon />
          <Link className="weekend-results__btn" to={`/results/${weekend.year}/rounds/${weekend.round}/race`}>
            <span>Race results</span>
          </Link>
        </div>
      </Tooltip>

      <Tooltip title="Wikipedia page" arrow={true} disableInteractive={true}>
        <div className="icon__container">
          <InfoIcon />
          <Link className="weekend-wiki__btn" to={weekend.wiki}>
            <span>More info</span>
          </Link>
        </div>
      </Tooltip>
    </div>
  )
}

export default WeekendLinks
