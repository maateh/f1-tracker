import { useEffect, useState } from 'react'

// hooks
import { useTimer } from './hooks/useTimer'

// context
import { useWeekendContext } from '../../../context/hooks/useWeekendContext'

// models
import SessionModel from '../../../../../model/season/weekend/session/Session'

// styles
import './CountdownTimer.css'

const CountdownTimer = ({ session, setSession }) => {
	const { weekend } = useWeekendContext()

	const [duration, setDuration] = useState(session.getCountdown())
	const { isOver, days, hours, minutes, seconds } = useTimer({
		duration,
		setDuration,
	})

	useEffect(() => {
		setDuration(session.getCountdown())
	}, [session])

	const handleRefresh = () => {
		if (session.key === SessionModel.KEYS.RACE && !session.isActive()) {
			window.location.reload()
		}
		setSession(new SessionModel(weekend.getRelevantSession()))
	}

	return (
		<div className="countdown-timer">
			{isOver ? (
				<div>
					{session.isActive() ? (
						<p className="started">Session Started!</p>
					) : (
						<p className="ended">Session Ended!</p>
					)}
					<span
						className="refresh"
						onClick={handleRefresh}
					>
						Click to Refresh!
					</span>
				</div>
			) : (
				<>
					{days > 0 && (
						<>
							<div className="unit__container">
								<span className="value">
									{days.toString().padStart(2, '0')}
								</span>
								<p className="unit">days</p>
							</div>
							<span className="separator">:</span>
						</>
					)}
					<div className="unit__container">
						<span className="value">{hours.toString().padStart(2, '0')}</span>
						<p className="unit">hours</p>
					</div>
					<span className="separator">:</span>
					<div className="unit__container">
						<span className="value">{minutes.toString().padStart(2, '0')}</span>
						<p className="unit">minutes</p>
					</div>
					<span className="separator">:</span>
					<div className="unit__container">
						<span className="value">{seconds.toString().padStart(2, '0')}</span>
						<p className="unit">seconds</p>
					</div>
				</>
			)}
		</div>
	)
}

export default CountdownTimer
