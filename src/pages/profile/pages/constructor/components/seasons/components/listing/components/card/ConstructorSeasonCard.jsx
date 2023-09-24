import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../../../../../components/listing/cards/card/Card'
import Linking from '../../../../../../../../../../components/linking/Linking'

// constants
import {
	CARD_COLOR_ORANGE,
	CARD_COLOR_SECONDARY,
	CARD_SIZE_MEDIUM,
} from '../../../../../../../../../../components/listing/cards/card/CardConstants'
import {
	LINKING_POS_BOTTOM_LEFT,
	LINKING_SIZE_SMALL,
} from '../../../../../../../../../../components/linking/LinkingConstants'

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
			size={CARD_SIZE_MEDIUM}
			bgColor={CARD_COLOR_ORANGE}
			borderColor={CARD_COLOR_SECONDARY}
			invertOnHover={true}
			onClick={() =>
				navigate(
					`/results/${standings.year}/constructors/${results.constructor.id}/race`
				)
			}
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
				size={LINKING_SIZE_SMALL}
				positioningClasses={LINKING_POS_BOTTOM_LEFT}
			/>
		</Card>
	)
}

export default ConstructorSeasonCard
