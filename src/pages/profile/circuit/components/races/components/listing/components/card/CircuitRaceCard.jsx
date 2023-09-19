import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// components
import Linking from '../../../../../../../../../components/linking/Linking'

// constans
import { POS_BOTTOM_LEFT, SIZE_SMALL } from '../../../../../../../../../components/linking/LinkingConstants'

// icons
import EventIcon from '@mui/icons-material/Event'
import LabelIcon from '@mui/icons-material/Label'
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
        <p className="weekend-date icon__container dark">
          <EventIcon />
          <span>{weekend.sessions.race.getFormattedDate('MMMM dd.')}</span>
        </p>
        <Tooltip title="Round of the season" followCursor={true}>
          <p className="weekend-round">#{weekend.round}</p>
        </Tooltip>
        <p className="weekend-name icon__container dark">
          <LabelIcon />
          <span>{weekend.name}</span>
        </p>

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
