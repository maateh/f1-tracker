// components
import CountdownTimer from '../../components/CountdownTimer'

// models
import Weekend from '../../model/weekend/Weekend'

// styles
import './WeekendInfo.css'

const WeekendInfo = ({ data }) => {
	const weekend = new Weekend(data)
	console.log('WEEKEND: ', weekend)

	return (
		<div className="weekend-info">
			<div className="next-weekend">
				<h2 className="title">{`${weekend.active ? 'Current' : 'Next'} Weekend`}</h2>
				<p className="race">{weekend.name}</p>
				<p className="track">{weekend.circuit.name}</p>
				<p className="date">{weekend.sessions.race.getFormattedDate('yyyy.MM.dd')}</p>
				<p className="time">{weekend.sessions.race.getFormattedDate('HH:mm')}</p>
			</div>
			<div className="next-session">
				<h2 className="title">{`${weekend.relevantSession.active ? 'Current' : 'Next'} Session`}</h2>
				<p className="name">{weekend.relevantSession.title}</p>
				{weekend.relevantSession.active ? 
					<CountdownTimer end={weekend.relevantSession.end} /> :
					<CountdownTimer end={weekend.relevantSession.start} />
				}
			</div>
		</div>
	)
}

export default WeekendInfo


// FP1: 2023-06-07T10:00:00Z - 12:00
// FP2: 2023-06-07T13:00:00Z - 15:00
// FP3: 2023-06-08T10:00:00Z - 12:00
// Q: 2023-06-08T13:00:00Z - 15:00
// RACE: 2023-06-09T13:00:00Z - 15:00