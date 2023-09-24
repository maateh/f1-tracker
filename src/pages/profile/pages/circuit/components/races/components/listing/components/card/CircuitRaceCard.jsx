import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// components
import Card from '../../../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../../../components/linking/Linking'

// constans
import { CARD_COLOR_GREEN, CARD_COLOR_SECONDARY, CARD_SIZE_MEDIUM } from '../../../../../../../../../../components/listing/cards/card/CardConstants'
import { LINKING_POS_BOTTOM_LEFT, LINKING_SIZE_SMALL } from '../../../../../../../../../../components/linking/LinkingConstants'

// icons
import EventIcon from '@mui/icons-material/Event'
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './CircuitRaceCard.css'

const CircuitRaceCard = ({ weekend }) => {
  const navigate = useNavigate()

  return (
    <Card
      tooltipText="Race results"
      size={CARD_SIZE_MEDIUM}
      bgColor={CARD_COLOR_GREEN}
      borderColor={CARD_COLOR_SECONDARY}
      invertOnHover={true}
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
        tooltipText="Go to the Wikipedia page"
        link={weekend.wiki}
        icon={<PublicIcon />}
        launchIcon={true}
        size={LINKING_SIZE_SMALL}
        positioningClasses={LINKING_POS_BOTTOM_LEFT}
      />
    </Card>
  )
}

export default CircuitRaceCard
