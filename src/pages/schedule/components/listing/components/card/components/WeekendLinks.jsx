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
        <Link 
          className="weekend-results__btn icon__container"
          to={`/results/${weekend.year}/rounds/${weekend.round}/race`}
          onClick={e => e.stopPropagation()}
        >
          <SegmentIcon />
          <span>Race results</span>
        </Link>
      </Tooltip>

      <Tooltip title="Wikipedia page" arrow={true} disableInteractive={true}>
        <Link
          className="weekend-wiki__btn icon__container"
          to={weekend.wiki}
          onClick={e => e.stopPropagation()}
        >
          <InfoIcon />
          <span>More info</span>
        </Link>
      </Tooltip>
    </div>
  )
}

export default WeekendLinks
