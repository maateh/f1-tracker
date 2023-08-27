import { useNavigate } from 'react-router-dom'

// components
import WeekendMarker from './components/WeekendMarker'
import WeekendTitle from './components/WeekendTitle'
import WeekendDate from './components/WeekendDate'
import WeekendTime from './components/WeekendTime'
import WeekendSprint from './components/WeekendSprint'
import WeekendLinks from './components/WeekendLinks'
import WeekendRound from './components/WeekendRound'

// styles
import './WeekendCard.css'

const WeekendCard = ({ weekend, nextWeekend }) => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		if (!weekend.sessions.race.isOver()) return
		navigate(`/results/${weekend.year}/rounds/${weekend.round}/race`)
	}

	return (
		<li
			onClick={handleNavigate}
			className={`weekend-card__container 
				${weekend.isActive() ? 'active' 
					: weekend.year === nextWeekend.year && weekend.round === nextWeekend.round ? 'next' 
					: weekend.isRemaining() ? 'remaining' : ''}`} 
		>
			<WeekendMarker weekend={weekend} nextWeekend={nextWeekend.round} />
			<WeekendTitle title={weekend.name} />
			<WeekendDate sessions={weekend.sessions} />
			<WeekendTime race={weekend.sessions.race} />
			<WeekendSprint sprint={weekend.sessions.sprint} />
			<WeekendLinks weekend={weekend} />
			<WeekendRound round={weekend.round} />
		</li>
	)
}

export default WeekendCard
