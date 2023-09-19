import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './CircuitRaceCard.css'

const CircuitRaceCard = ({ weekend, lastRef }) => {
  const navigate = useNavigate()

  return (
    <Tooltip title="Race results" followCursor={true} placement="top" arrow>
      <li
        className="circuit-race-card__container"
        ref={lastRef || undefined}
        onClick={() => navigate(`/results/${weekend.year}/rounds/${weekend.round}/race`)}
      >
        <h3 className="weekend-year">{weekend.year}</h3>
        <h3 className="weekend-date">{weekend.sessions.race.getFormattedDate('MMMM dd.')}</h3>
        <p className="weekend-round">Round: #{weekend.round}</p>
        <p className="weekend-name">{weekend.name}</p>

        <Link
          className="weekend-wiki__link icon__container"
          onClick={e => e.stopPropagation()}
          to={weekend.wiki}
        >
          <LaunchIcon fontSize="small" />
          <span>Wikipedia</span>
        </Link>
      </li>
    </Tooltip>
  )
}

export default CircuitRaceCard
