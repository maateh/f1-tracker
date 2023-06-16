// components
import WeekendHeadline from './weekend/WeekendHeadline'
import SessionHeadline from './session/SessionHeadline'

// styles
import './WeekendInfo.css'

const WeekendInfo = () => {
	return (
		<div className="weekend-info">
			<WeekendHeadline />
			<SessionHeadline />
		</div>
	)
}

export default WeekendInfo