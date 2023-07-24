// icons
import EventIcon from '@mui/icons-material/Event'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import EngineeringIcon from '@mui/icons-material/Engineering'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import CelebrationIcon from '@mui/icons-material/Celebration'
import PlusOneIcon from '@mui/icons-material/PlusOne'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { qualifyingsResults, racesResults } from '../../../api/results'

// models
import Season from '../../season/Season'
import Result from '../../season/weekend/result/Result'
import Qualifying from '../../season/weekend/result/qualifying/Qualifying'
import QueryError from '../../error/QueryError'

class SeasonListing {
  static async query(year) {
		return Promise.all([qualifyingsResults(year), racesResults(year)])
			.then(data => {
				const season = new Season(data[1])
        if (!season.weekends) {
          throw new QueryError('No data found!', 404)
        }

        const qResults = data[0].Races.map(w => new Result(w))
        if (qResults && qResults.length) {
          season.weekends.forEach((w, index) => w.result.qualifying = qResults[index].qualifying)
        }

				return new SeasonListing(season)
			})
			.catch(err => {
				throw new QueryError(err.message, err.code)
			})
	}

  constructor(season) {
    this.season = season
    this.title = `${season.year} Season Results`

    this.info = [
      {
        category: 'General Information',
        data: [
          { title: 'Drivers', desc: this.driversAmount(), icon: <SportsMotorsportsIcon /> },
          { title: 'Constructors', desc: this.constructorsAmount(), icon: <EngineeringIcon /> },
          { title: 'Race Weekends', desc: this.weekendsAmount(), icon: <EventIcon /> },
        ]
      },
      {
        category: 'How many different?',
        data: [
          { title: 'Grand Prix Winners', desc: this.grandPrixWinners(), icon: <EmojiEventsIcon /> },
          { title: 'Pole Sitters', desc: this.poleSitters(), icon: <WorkspacePremiumIcon /> },
          { title: 'Drivers on Podium', desc: this.driversOnPodium(), icon: <CelebrationIcon /> },
          { title: 'Point Scorers', desc: this.pointScorers(), icon: <PlusOneIcon /> },
        ]
      },
      {
        category: 'Drivers Races Status',
        data: [
          { title: 'Finished the Race', desc: this.finished(), icon: <SportsScoreIcon /> },
          { title: 'Drivers got a Lap', desc: this.gotALap(), icon: <Timer10SelectIcon /> },
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
      { key: 'pole', placeholder: 'Pole Lap' },
      { key: 'winner', placeholder: 'Winner' },
      { key: 'fl', placeholder: 'Fastest Lap' },
      { key: 'laps', placeholder: 'Laps' },
      { key: 'duration', placeholder: 'Race Duration' },
    ]

    this.table = season.weekends.map((w, index) => ({
      key: index,
      data: [
        { key: 'round', data: w.round },
        { key: 'weekend', data: w.name },
        { key: 'date', data: w.getFormattedDate('MMM dd.') },
        { key: 'circuit', data: w.circuit.name },
        { key: 'pole', data: [
          { key: 'pole-time', data: this.pole(w)?.time },
          { key: 'pole-driver', data: this.pole(w)?.driver?.code },
       ]},
        { key: 'winner', data: [
          { key: 'winner-driver', data: w.result.race[0].driver.fullName },
          { key: 'winner-constructor', data: w.result.race[0].constructor.name }
        ]},
        { key: 'fl', data: [
          { key: 'fl-time', data: this.fastest(w) ? this.fastest(w).fastestLap.time : '-' },
          { key: 'fl-driver', data: this.fastest(w) ? this.fastest(w).driver.code : '' }
        ]},
        { key: 'laps', data: w.result.race[0].laps },
        { key: 'duration', data: w.result.race[0].raceTime }
      ]
    }))
  }

  // General information
  weekendsAmount() {
    const year = new Date().getFullYear()
    return `${this.season.weekends.length} weekends in this season ${year === +this.season.year ? ' currently' : ''}`
  }

  driversAmount() {
    const drivers = this.season.weekends.map(w => (
      w.result.race.map(r => r.driver.code)
    )).flat(1)
    return `${new Set(drivers).size} drivers participated`
  }

  constructorsAmount() {
    const constructors = this.season.weekends.map(w => (
      w.result.race.map(r => r.constructor.id)
    )).flat(1)
    return `${new Set(constructors).size} constructors participated`
  }


  // How many different?
  grandPrixWinners() {
    const winners = this.season.weekends.map(w => w.result.race[0].driver.code)
    return `${new Set(winners).size} different drivers`
  }

  poleSitters() {
    const poleSitters = this.season.weekends.find(w => w.result.qualifying) ? 
      this.season.weekends.map(w => w.result.qualifying[0].driver.code) :
      []
    return poleSitters.length ? `${new Set(poleSitters).size} different drivers` : '-'
  }

  driversOnPodium() {
    const driversOnPodium = this.season.weekends.map(w => ([
      w.result.race[0].driver.code,
      w.result.race[1].driver.code,
      w.result.race[2].driver.code
    ])).flat(1)
    return `${new Set(driversOnPodium).size} different drivers`
  }

  pointScorers() {
    const pointScorers = this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.points > 0)
        .map(r => r.driver.code)
    )).flat(1)
    return `${new Set(pointScorers).size} different drivers`
  }


  // Drivers Races Status
  finished() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Finished') || r.status.includes('+'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  gotALap() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('+'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  crashed() {
    return this.season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
        .map(r => r.driver.code)
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
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }


  // Table info
  pole(weekend) {
		return weekend.result.qualifying ? 
      weekend.result.qualifying[0] : 
      new Qualifying()
	}

	fastest(weekend) {
		return weekend.result.race
      .find(r => +r.fastestLap?.rank === 1)
	}
}

export default SeasonListing
