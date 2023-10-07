import { useNavigate } from 'react-router-dom'

// components
import Card from '../../../../../../components/listing/cards/components/card/Card'
import StatusMarker from './components/status/StatusMarker'
import SprintMarker from './components/sprint/SprintMarker'
import ScheduleInfo from './components/info/ScheduleInfo'
import ResultLinks from './components/links/ResultLinks'
import RoundMarker from './components/round/RoundMarker'

// constants
import { CARD_SIZE_LARGE } from '../../../../../../components/listing/cards/components/card/constants/CardConstants'

// styles
import './ScheduleCard.css'

const ScheduleCard = ({ weekend, nextWeekend }) => {
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
			<StatusMarker weekend={weekend} nextWeekend={nextWeekend.round} />
			<SprintMarker sprint={weekend.sessions.sprint} />

			<ScheduleInfo title={weekend.name} sessions={weekend.sessions} />

			<ResultLinks weekend={weekend} />
			<RoundMarker round={weekend.round} />
		</Card>
	)
}

export default ScheduleCard
