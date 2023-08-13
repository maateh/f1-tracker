import { Link } from 'react-router-dom'

// icons
import EventIcon from '@mui/icons-material/Event'
import TimerIcon from '@mui/icons-material/Timer'
import FlashOnIcon from '@mui/icons-material/FlashOn'

// styles
import './WeekendCard.css'

const WeekendCard = ({ weekend, nextRound }) => {
	return (
		<div
			className={`weekend-card__container ${
				weekend.isActive() ? 'active' : ''
			} ${weekend.round === nextRound ? 'next' : ''}`}
		>
			<h3 className="weekend-title">{weekend.name}</h3>
			<div className="weekend-date__container">
				<EventIcon />
				<span className="weekend-date">
					{weekend.sessions.practices &&
						`${weekend.sessions.practices[0].getFormattedDate('MMM. dd.')} - `}
					{weekend.sessions.race.getFormattedDate('MMM. dd.')}
				</span>
			</div>

			{weekend.sessions.race.time && (
				<div className="weekend-date__container">
					<TimerIcon />
					<span className="race-time">
						{weekend.sessions.race.getFormattedDate('HH:mm')}
					</span>
				</div>
			)}

			{weekend.sessions.sprint && (
				<div className="sprint-container">
					<p className="sprint-warn">Sprint weekend!</p>

					{weekend.sessions.sprint.race.time && (
						<div className="weekend-date__container">
							<TimerIcon />
							<span className="sprint-time">
								{weekend.sessions.sprint.qualifying.getFormattedDate('HH:mm')}
							</span>

							<FlashOnIcon />
							<span className="sprint-time">
								{weekend.sessions.sprint.race.getFormattedDate('HH:mm')}
							</span>
						</div>
					)}
				</div>
			)}

			{weekend.sessions.race.isOver() && (
				<div className="weekend-links__container">
					<Link
						className="weekend-results__btn"
						to={`/results/${weekend.year}/rounds/${weekend.round}/race`}
					>
						Weekend results
					</Link>

					<Link className="weekend-wiki__btn" to={weekend.wikiUrl}>
						More info
					</Link>
				</div>
			)}

			<p className="round">#{weekend.round}</p>
		</div>
	)
}

export default WeekendCard
