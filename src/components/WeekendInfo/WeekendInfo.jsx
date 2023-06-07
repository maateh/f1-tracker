// components
import CountdownTimer from './CountdownTimer'

// models
import RaceWeekend from '../../model/WeekendInfo/RaceWeekend'

// styles
import './WeekendInfo.css'

const Counter = ({ data }) => {
	const raceWeekend = new RaceWeekend(data)
	console.log('RACE_WEEKEND: ', raceWeekend)

	// FP1: 2023-06-07T10:00:00Z - 12:00
	// FP2: 2023-06-07T13:00:00Z - 15:00
	// FP3: 2023-06-08T10:00:00Z - 12:00
	// Q: 2023-06-08T13:00:00Z - 15:00
	// RACE: 2023-06-09T13:00:00Z - 15:00

	return (
		<div className="weekend-info">
			<div className="weekend-info__next-weekend">
				<h2 className="weekend-info__next-weekend__title">{raceWeekend.active ? 'Current Grand Prix' : 'Next Grand Prix'}</h2>
				<p className="weekend-info__next-weekend__race">{raceWeekend.name}</p>
				<p className="weekend-info__next-weekend__track">{raceWeekend.circuit.name}</p>
				<p className="weekend-info__next-weekend__date">{raceWeekend.sessions.race.getFormattedDate('yyyy.MM.dd')}</p>
				<p className="weekend-info__next-weekend__time">{raceWeekend.sessions.race.getFormattedDate('HH:mm')}</p>
			</div>
			<div className="weekend-info__next-session">
				<h2 className="weekend-info__next-session__title">{raceWeekend.relevantSession.active ? 'Current Session' : 'Next Session'}</h2>
				<p className="weekend-info__next-session__name">{raceWeekend.relevantSession.title}</p>
				{raceWeekend.relevantSession.active ? (
					<CountdownTimer
						start={() => Date.now()}
						end={raceWeekend.relevantSession.end} 
					/>
				) : (
					<CountdownTimer
						start={() => Date.now()}
						end={raceWeekend.relevantSession.start} 
					/>
				)}
			</div>
		</div>
	)
}

export default Counter
