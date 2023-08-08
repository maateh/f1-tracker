// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import PublicIcon from '@mui/icons-material/Public'
import CakeIcon from '@mui/icons-material/Cake'
import TagIcon from '@mui/icons-material/Tag'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BoltIcon from '@mui/icons-material/Bolt'
import PlusOneIcon from '@mui/icons-material/PlusOne'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { driverRacesResults } from "../../../../api/results"

// model
import Season from "../../../season/Season"
import QueryError from "../../../error/QueryError"

class DriverRacesListing {
  static async query(year, driverId) {
    return driverRacesResults(year, driverId)
      .then(({ data }) => {
        const season = new Season(data)
        if (!season.weekends) {
          throw new QueryError('No data found!', 404)
        }
        return new DriverRacesListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(season) {
    this.season = season
    this.title = `${season.year} Race Results - ${this.driver.fullName} ${this.driver.formattedNumber}`
    
    this.info = [
      {
        category: 'Driver Information',
        data: [
          { title: 'Full Name', desc: this.driver.fullName, icon: <SportsMotorsportsIcon /> },
          { title: 'Nationality', desc: this.driver.nationality, icon: <PublicIcon /> },
          { title: 'Date of Birth', desc: this.driver.dateOfBirth, icon: <CakeIcon /> },
          { title: 'Driver code, number', desc: `${this.driver.code} ${this.driver.formattedNumber}`, icon: <TagIcon /> },
        ]
      },
      {
        category: 'Driver Achievements',
        data: [
          { title: 'Win a Race', desc: this.win(), icon: <EmojiEventsIcon /> },
          { title: 'Podium Finish', desc: this.podium(), icon: <CelebrationIcon /> },
          { title: 'Fastest Lap', desc: this.fastestLaps(), icon: <BoltIcon /> },
          { title: 'Scoring Positions', desc: this.scoringPositions(), icon: <PlusOneIcon /> }
        ]
      },
      {
        category: 'Driver Race Statuses',
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
      { key: 'grid', placeholder: 'Grid' },
      { key: 'fl', placeholder: 'Fastest Lap' },
      { key: 'laps', placeholder: 'Completed Laps' },
      { key: 'duration', placeholder: 'Race Gap' },
      { key: 'position', placeholder: 'Position' },
      { key: 'points', placeholder: 'Points' },
    ]

    this.table = season.weekends.map((w, index) => ({
      key: index,
      data: [
        { key: 'round', data: w.round },
        { key: 'weekend', data: w.name },
        { key: 'date', data: w.getFormattedDate('MMM dd.') },
        { key: 'circuit', data: w.circuit.name },
        { key: 'grid', data: w.result.race[0].grid },
        { key: 'fl', data: [
          { key: 'fl-time', data: w.result.race[0].fastestLap.time },
          { key: 'fl-speed', data: w.result.race[0].fastestLap?.avgSpeed },
        ] },
        { key: 'laps', data: w.result.race[0].laps },
        { key: 'duration', data: w.result.race[0].raceTime },
        { key: 'position', data: w.result.race[0].position },
        { key: 'points', data: w.result.race[0].points },
      ]
    }))
  }

  get driver() {
    return this.season.weekends[0].result.race[0].driver
  }

  // Driver Achievements
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


  // Driver Race Statuses
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
}

export default DriverRacesListing
