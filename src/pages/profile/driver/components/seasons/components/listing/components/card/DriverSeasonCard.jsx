import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// components
import Linking from '../../../../../../../../../components/linking/Linking'

// constants
import { POS_BOTTOM_LEFT, SIZE_SMALL } from '../../../../../../../../../components/linking/LinkingConstants'

// icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SegmentIcon from '@mui/icons-material/Segment'

// styles
import './DriverSeasonCard.css'

const DriverSeasonCard = ({ standings }) => {
  const results = standings.drivers[0]
  const navigate = useNavigate()

  return (
    <Tooltip title="Driver's season results" placement='top' arrow>
      <li
        className="driver-season-card__container"
        onClick={() => navigate(`/results/${standings.year}/drivers/${results.driver.id}/race`)}
      >
        <h3 className="standings-year">{standings.year}</h3>
        <p className="standings-rounds icon__container dark">
          <EventAvailableIcon />
          <span>{standings.round} race weekends</span>
        </p>
        <p className="standings-rounds icon__container dark">
          <EmojiEventsIcon />
          <span>Championship position: #{results.position}</span>
        </p>

        <Linking
          text="Driver standings"
          tooltipText="Go to the Driver standings Results page"
          link={`/results/${standings.year}/drivers/all`}
          icon={<SegmentIcon />}
          launchIcon={true}
          size={SIZE_SMALL}
          positioningClasses={POS_BOTTOM_LEFT}
        />
      </li>
    </Tooltip>
  )
}

export default DriverSeasonCard
