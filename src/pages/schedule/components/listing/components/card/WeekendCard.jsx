import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../components/listing/cards/components/card/Card'
import WeekendMarker from './components/WeekendMarker'
import WeekendTitle from './components/WeekendTitle'
import WeekendDate from './components/WeekendDate'
import WeekendTime from './components/WeekendTime'
import WeekendSprint from './components/WeekendSprint'
import WeekendLinks from './components/WeekendLinks'
import WeekendRound from './components/WeekendRound'

// constants
import { CARD_SIZE_LARGE } from '../../../../../../components/listing/cards/components/card/constants/CardConstants'

// styles
import './WeekendCard.css'

const WeekendCard = ({ weekend, nextWeekend }) => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		if (!weekend.sessions.race.isOver()) return
		navigate(`/results/${weekend.year}/rounds/${weekend.round}/race`)
	}

	return (
    <Card
			classNames={`schedule ${weekend.isActive() ? 'active' 
				: weekend.year === nextWeekend.year && weekend.round === nextWeekend.round ? 'next' 
				: weekend.isRemaining() ? 'remaining' : ''}`} 
      size={CARD_SIZE_LARGE}
      onClick={handleNavigate}
    >
			<WeekendMarker weekend={weekend} nextWeekend={nextWeekend.round} />
			<WeekendSprint sprint={weekend.sessions.sprint} />

			<WeekendTitle title={weekend.name} />
			<WeekendDate sessions={weekend.sessions} />
			<WeekendTime race={weekend.sessions.race} />

			<WeekendLinks weekend={weekend} />
			<WeekendRound round={weekend.round} />
		</Card>
	)
}

export default WeekendCard
