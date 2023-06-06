// components
import CountdownTimer from './CountdownTimer'

// models
import RaceWeekend from '../../model/WeekendInfo/RaceWeekend'

// styles
import './WeekendInfo.css'

const Counter = ({ data }) => {
	const raceWeekend = new RaceWeekend(data)
	console.log('RACE_WEEKEND: ', raceWeekend)

	return (
		<div className="weekend-info">
			<div className="weekend-info__next-weekend">
				<h2 className="weekend-info__next-weekend__title">Next Grand Prix</h2>
				<p className="weekend-info__next-weekend__race">{raceWeekend.name}</p>
				<p className="weekend-info__next-weekend__track">{raceWeekend.circuit.name}</p>
				<p className="weekend-info__next-weekend__date">{raceWeekend.sessions.race.getFormattedDate('yyyy.MM.dd')}</p>
				<p className="weekend-info__next-weekend__time">{raceWeekend.sessions.race.getFormattedDate('HH:mm')}</p>
			</div>
			<div className="weekend-info__next-session">
				<h2 className="weekend-info__next-session__title">Next Session</h2>
				<p className="weekend-info__next-session__name">{raceWeekend.nextSessionTitle()}</p>
				<CountdownTimer end={raceWeekend.sessions.practices[0].datetime} />
			</div>
		</div>
	)
}

export default Counter
