// hooks
import { useTimer } from './hooks/useTimer'

// context
import { useWeekendContext } from '../../../context/hooks/useWeekendContext'

// styles
import './CountdownTimer.css'

const CountdownTimer = ({ end }) => {
	const { weekend: { sessions: { currentSession }} } = useWeekendContext()
	const { duration } = useTimer(end)

	// TODO
	// ehelyett jó lenne nem az egész oldalt frissíteni
	// hanem csak a session countdown cuccokat
	const handleRefresh = () => {
		window.location.reload()
	}

	return (
		<div className="countdown-timer">
			{duration && (
				Object.values(duration).every(item => item === 0) ? (
					<div>
						{currentSession.isActive() ? (
							<p className="started">Session Ended!</p>
						) : (
							<p className="started">Session Started!</p>
						)}
						<span className="refresh" onClick={handleRefresh}>
							Click to Refresh!
						</span>
					</div>
				) : (
					<>
						{duration.days > 0 && (
							<>
								<div className="unit__container">
									<span className="value">{duration.days}</span>
									<p className="unit">days</p>
								</div>
								<span className="separator">:</span>
							</>
						)}
						<div className="unit__container">
							<span className="value">{duration.hours}</span>
							<p className="unit">hours</p>
						</div>
						<span className="separator">:</span>
						<div className="unit__container">
							<span className="value">{duration.minutes}</span>
							<p className="unit">minutes</p>
						</div>
						<span className="separator">:</span>
						<div className="unit__container">
							<span className="value">{duration.seconds}</span>
							<p className="unit">seconds</p>
						</div>
					</>
				)
			)}
		</div>
	)
}

export default CountdownTimer
