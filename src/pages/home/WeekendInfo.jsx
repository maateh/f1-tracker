// components
import WeekendHeadline from './weekend/WeekendHeadline'
import SessionHeadline from './session/SessionHeadline'

// models
import Weekend from '../../model/schedule/weekend/Weekend'

// styles
import './WeekendInfo.css'

const WeekendInfo = ({ data }) => {
	const weekend = new Weekend(data.Races[0])
	// console.log('WEEKEND: ', weekend)

	return (
		<div className="weekend-info">
			<WeekendHeadline weekend={weekend} />
			<SessionHeadline session={weekend.sessions.relevantSession} />
		</div>
	)
}

export default WeekendInfo


// FP1: 2023-06-07T10:00:00Z - 12:00
// FP2: 2023-06-07T13:00:00Z - 15:00
// FP3: 2023-06-08T10:00:00Z - 12:00
// Q: 2023-06-08T13:00:00Z - 15:00
// RACE: 2023-06-09T13:00:00Z - 15:00