// icons
import EngineeringIcon from '@mui/icons-material/Engineering'
import PublicIcon from '@mui/icons-material/Public'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BoltIcon from '@mui/icons-material/Bolt'
import PlusOneIcon from '@mui/icons-material/PlusOne'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { constructorRacesResults } from '../../../../api/results'

// model
import Season from '../../../season/Season'
import QueryError from '../../../error/QueryError'

class ConstructorRacesListing {
	static async query(year, constructorId) {
		return constructorRacesResults(year, constructorId)
			.then(({ data }) => {
				const season = new Season(data)
				if (!season.weekends) {
					throw new QueryError('No data found!', 404)
				}
				return new ConstructorRacesListing(season)
			})
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
	}

	constructor(season) {
		this.season = season
		this.title = `${season.year} Race Results - ${this.team.name}`

		this.info = [
			{
				category: 'Constructor Information',
				data: [
					{ title: 'Team Name', desc: this.team.name, icon: <EngineeringIcon /> },
					{ title: 'Nationality', desc: this.team.nationality, icon: <PublicIcon /> },
					{ title: 'Drivers', desc: this.driversQuantity(), icon: <SportsMotorsportsIcon /> },
					{ title: 'More info', desc: 'link to wiki', icon: <ContactSupportIcon /> },
				],
			},
      {
        category: 'Constructor Achievements',
        data: [
          { title: 'Win a Race', desc: this.win(), icon: <EmojiEventsIcon /> },
          { title: 'Podium Finish', desc: this.podium(), icon: <CelebrationIcon /> },
          { title: 'Fastest Lap', desc: this.fastestLaps(), icon: <BoltIcon /> },
          { title: 'Scoring Positions', desc: this.scoringPositions(), icon: <PlusOneIcon /> }
        ]
      },
      {
        category: 'Constructor Race Statuses',
        data: [
          { title: 'Finished the Race', desc: this.finished(), icon: <SportsScoreIcon /> },
          { title: 'Got a Lap', desc: this.gotALap(), icon: <Timer10SelectIcon /> },
          { title: 'Crashed in Race', desc: this.crashed(), icon: <ErrorIcon /> },
          { title: 'Mechanical Failures', desc: this.failures(), icon: <WarningIcon /> }
        ]
      },
		]

		this.header = [
			{ key: 'round', placeholder: 'Round' },
			{ key: 'weekend', placeholder: 'Weekend' },
			{ key: 'date', placeholder: 'Date' },
			{ key: 'circuit', placeholder: 'Circuit Name' },
			
			{ key: 'fl', placeholder: 'Fastest Lap' },
			{ key: 'laps', placeholder: 'Completed Laps' },
			{ key: 'points', placeholder: 'Points' },
		]

		this.table = season.weekends.map((w, index) => ({
			key: index,
			data: [
				{ key: 'round', data: w.round },
				{ key: 'weekend', data: w.name },
				{ key: 'date', data: w.getFormattedDate('MMM dd.') },
				{ key: 'circuit', data: w.circuit.name },

				{ key: 'fl', data: [
					{ key: 'fl-time', data: this.faster(w).fastestLap.time },
					{ key: 'fl-driver', data: this.fasterDriver(w) },
				] },
				{ key: 'laps', data: `${this.completedLaps(w)} laps` },
				{ key: 'points', data: [
					{ key: 'points-amount', data: `${this.points(w)} points` },
					{ key: 'points-drivers', data: this.scorers(w) },
				] },
			]
		}))
	}

	get team() {
		return this.season.weekends[0].result.race[0].constructor
	}

	// Constructor Information
	driversQuantity() {
		const quantity = this.season.weekends.map(w => (
			w.result.race
				.map(r => r.driver.code)
		)).flat(1)
		return `${new Set(quantity).size} drivers drove for them`
	}

  // Constructor Achievements
  win() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => +r.position === 1)
    )).flat(1).length + ' times in this season'
  }

  podium() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => +r.position <= 3)
    )).flat(1).length + ' times in this season'
  }

  fastestLaps() {
    return this.season.weekends[0].result.race[0].fastestLap.time === '-' ?
      '-' :
      this.season.weekends.map(w => (
        w.result.race
          .filter(r => +r.fastestLap.rank === 1)
      )).flat(1).length + ' times in this season'
  }

  scoringPositions() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => +r.points > 0)
    )).flat(1).length + ' times in this season'
  }


  // Constructor Race Statuses
  finished() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Finished') || r.status.includes('+'))
    )).flat(1).length + ' times in this season'
  }

  gotALap() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('+'))
    )).flat(1).length + ' times in this season'
  }

  crashed() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
    )).flat(1).length + ' times in this season'
  }

  failures() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => 
          !r.status.includes('Finished') || 
          !r.status.includes('+') || 
          !r.status.includes('Accident') || 
          !r.status.includes('Collision')
        )
    )).flat(1).length + ' times in this season'
  }


	// Table info
	faster(weekend) {
		return weekend.result.race
			.sort((acc, curr) => Math.min(acc.fastestLap.rank, curr.fastestLap.rank))[0]
	}

	fasterDriver(weekend) {
		const faster = this.faster(weekend)
		return faster.fastestLap.time === '-' ? 
			'' : faster.driver.code
	}

	completedLaps(weekend) {
		return weekend.result.race.length > 1 ?
			weekend.result.race
				.reduce((acc, curr) => +acc.laps || acc + +curr.laps) :
			weekend.result.race[0].laps
	}

	points(weekend) {
		return weekend.result.race
			.reduce((acc, curr) => +acc.points || acc + +curr.points, 0)
	}

	scorers(weekend) {
		const result = weekend.result.race
		return result
			.reduce((acc, curr) => `${acc} ${curr.driver.code}: ${curr.points} - `, '')
			.slice(0, -3)
	}
}

export default ConstructorRacesListing
