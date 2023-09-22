import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// components
import Card from '../../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../../components/linking/Linking'

// constants
import { COLOR_ORANGE, COLOR_SECONDARY, MEDIUM_SIZE_CARD } from '../../../../../../../../../components/listing/cards/card/CardConstants'
import { POS_BOTTOM_LEFT, SIZE_SMALL } from '../../../../../../../../../components/linking/LinkingConstants'

// icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SegmentIcon from '@mui/icons-material/Segment'

// styles
import './ConstructorSeasonCard.css'

const ConstructorSeasonCard = ({ standings }) => {
  const results = standings.constructors[0]
  const navigate = useNavigate()

  return (
    <Card
      tooltipText="Constructor's season results"
      size={MEDIUM_SIZE_CARD}
      bgColor={COLOR_ORANGE}
      borderColor={COLOR_SECONDARY}
      invertOnHover={true}
      onClick={() => navigate(`/results/${standings.year}/constructors/${results.constructor.id}/race`)}      
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
        text="Constructor standings"
        tooltipText="Go to the Constructor standings Results page"
        link={`/results/${standings.year}/constructors/all`}
        icon={<SegmentIcon />}
        launchIcon={true}
        size={SIZE_SMALL}
        positioningClasses={POS_BOTTOM_LEFT}
      />
    </Card>
  )
}

export default ConstructorSeasonCard
