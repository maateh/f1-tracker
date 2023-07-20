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

import FlashOnIcon from '@mui/icons-material/FlashOn'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

// api
import { qualifyingsResults, racesResults } from '../../../api/results'

// models
import Season from '../../season/Season'
import Result from '../../season/weekend/result/Result'
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
    this.title = `${season.year} Season Results`
    this.info = [
      {
        category: 'General Information',
        data: [
          { title: 'Drivers', desc: this.driversAmount(season), icon: <SportsMotorsportsIcon /> },
          { title: 'Constructors', desc: this.constructorsAmount(season), icon: <EngineeringIcon /> },
          { title: 'Race Weekends', desc: this.weekendsAmount(season), icon: <EventIcon /> },
        ]
      },
      {
        category: 'How many different?',
        data: [
          { title: 'Grand Prix Winners', desc: this.grandPrixWinners(season), icon: <EmojiEventsIcon /> },
          { title: 'Pole Sitters', desc: this.poleSitters(season), icon: <WorkspacePremiumIcon /> },
          { title: 'Drivers on Podium', desc: this.driversOnPodium(season), icon: <CelebrationIcon /> },
          { title: 'Point Scorers', desc: this.pointScorers(season), icon: <PlusOneIcon /> },
        ]
      },
      {
        category: 'Drivers Races Status',
        data: [
          { title: 'Finished the Race', desc: this.finished(season), icon: <SportsScoreIcon /> },
          { title: 'Drivers got a Lap', desc: this.gotALap(season), icon: <Timer10SelectIcon /> },
          { title: 'Crashed in Race', desc: this.crashed(season), icon: <ErrorIcon /> },
          { title: 'Mechanical Failures', desc: this.failures(season), icon: <WarningIcon /> }
        ]
      },
      {
        category: 'Sprint Races',
        data: [
          { title: 'Amount of Sprints', desc: this.sprintsAmount(season), icon: <FlashOnIcon /> },
          { title: 'Sprint Race Winners', desc: this.sprintRaceWinners(season), icon: <MilitaryTechIcon /> },
          { title: 'Shootout Winners', desc: this.shootoutWinners(season), icon: <WorkspacePremiumIcon /> },
          { title: 'Point Scorers', desc: this.sprintPointScorers(season), icon: <PlusOneIcon /> },
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
          { key: 'pole-time', data: w.result.pole?.time },
          { key: 'pole-driver', data: w.result.pole.driver?.code },
       ]},
        { key: 'winner', data: [
          { key: 'winner-driver', data: w.result.raceWinner },
          { key: 'winner-constructor', data: w.result.raceWinnerConstructor }
        ]},
        { key: 'fl', data: [
          { key: 'fl-time', data: w.result.fastest? w.result.fastest.fastestLap.time : '-' },
          { key: 'fl-driver', data: w.result.fastest? w.result.fastest.driver.code : '' }
        ]},
        { key: 'laps', data: w.result.laps },
        { key: 'duration', data: w.result.raceDuration }
      ]
    }))
  }

  // General information
  weekendsAmount(season) {
    const year = new Date().getFullYear()
    return `${season.weekends.length} weekends in this season ${year === +season.year ? ' currently' : ''}`
  }

  driversAmount(season) {
    const drivers = season.weekends.map(w => (
      w.result.race.map(r => r.driver.code)
    )).flat(1)
    return `${new Set(drivers).size} drivers participated`
  }

  constructorsAmount(season) {
    const constructors = season.weekends.map(w => (
      w.result.race.map(r => r.constructor.id)
    )).flat(1)
    return `${new Set(constructors).size} constructors participated`
  }


  // How many different?
  grandPrixWinners(season) {
    const winners = season.weekends.map(w => w.result.race[0].driver.code)
    return `${new Set(winners).size} different drivers`
  }

  poleSitters(season) {
    const poleSitters = season.weekends.find(w => w.result.qualifying) ? 
      season.weekends.map(w => w.result.qualifying[0].driver.code) :
      []
    return poleSitters.length ? `${new Set(poleSitters).size} different drivers` : '-'
  }

  driversOnPodium(season) {
    const driversOnPodium = season.weekends.map(w => ([
      w.result.race[0].driver.code,
      w.result.race[1].driver.code,
      w.result.race[2].driver.code
    ])).flat(1)
    return `${new Set(driversOnPodium).size} different drivers`
  }

  pointScorers(season) {
    const pointScorers = season.weekends.map(w => (
      w.result.race
        .filter(r => r.points > 0)
        .map(r => r.driver.code)
    )).flat(1)
    return `${new Set(pointScorers).size} different drivers`
  }


  // Drivers Races Status
  finished(season) {
    return season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Finished' || '+'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  gotALap(season) {
    return season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('+'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  crashed(season) {
    return season.weekends.map(w => (
      w.result.race
        .filter(r => r.status.includes('Accident' || 'Collision'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  failures(season) {
    return season.weekends.map(w => (
      w.result.race
        .filter(r => !r.status.includes('Finished' || '+' || 'Accident' || 'Collision'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }


  // Sprint Races
  sprintsAmount(season) { return 'test_data' }

  sprintRaceWinners(season) { return 'test_data' }

  shootoutWinners(season) { return 'test_data' }

  driversInTopThree(season) { return 'test_data' }

  sprintPointScorers(season) { return 'test_data' }
}

export default SeasonListing