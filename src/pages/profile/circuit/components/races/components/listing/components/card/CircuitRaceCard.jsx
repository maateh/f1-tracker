import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// components
import Linking from '../../../../../../../../../components/linking/Linking'

// constans
import { POS_BOTTOM_LEFT, SIZE_SMALL } from '../../../../../../../../../components/linking/LinkingConstants'

// icons
import PublicIcon from '@mui/icons-material/Public'

// styles
import './CircuitRaceCard.css'

const CircuitRaceCard = ({ weekend, lastRef }) => {
  const navigate = useNavigate()

  return (
    <Tooltip title="Race results" placement='top' arrow>
      <li
        className="circuit-race-card__container"
        ref={lastRef || undefined}
        onClick={() => navigate(`/results/${weekend.year}/rounds/${weekend.round}/race`)}
      >
        <h3 className="weekend-year">{weekend.year}</h3>
        <h3 className="weekend-date">{weekend.sessions.race.getFormattedDate('MMMM dd.')}</h3>
        <p className="weekend-round">Round: #{weekend.round}</p>
        <p className="weekend-name">{weekend.name}</p>

        <Linking
          text="Wikipedia"
          tooltipText="Go to Wikipedia page"
          link={weekend.wiki}
          icon={<PublicIcon />}
          launchIcon={true}
          size={SIZE_SMALL}
          positioningClasses={POS_BOTTOM_LEFT}
        />
      </li>
    </Tooltip>
  )
}

export default CircuitRaceCard
