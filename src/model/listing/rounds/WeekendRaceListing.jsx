// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { raceResults } from "../../../api/results"

// model
import Weekend from "../../season/weekend/Weekend"
import QueryError from "../../error/QueryError"

class WeekendRaceListing {
  static async query(year, round) {
    return raceResults(year, round)
      .then(data => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }
        const weekend = new Weekend(data.Races[0])
        return new WeekendRaceListing(weekend)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(weekend) {
    this.title = `${weekend.year} ${weekend.name} Race Results`

    this.info = [
      {
        category: 'Circuit Information',
        data: [
          { title: 'Circuit Name', desc: weekend.circuit.name, icon: <LabelIcon /> },
          { title: 'Country', desc: weekend.circuit.location.country, icon: <PublicIcon /> },
          { title: 'Locality', desc: weekend.circuit.location.locality, icon: <LocationOnIcon /> },
          { title: 'More info', desc: 'link to wiki', icon: <ContactSupportIcon /> },
        ]
      },
      {
        category: 'Drivers Race Status',
        data: [
          { title: 'Finished the Race', desc: this.finished(weekend), icon: <SportsScoreIcon /> },
          { title: 'Drivers got a Lap', desc: this.gotALap(weekend), icon: <Timer10SelectIcon /> },
          { title: 'Crashed in Race', desc: this.crashed(weekend), icon: <ErrorIcon /> },
          { title: 'Mechanical Failures', desc: this.failures(weekend), icon: <WarningIcon /> }
        ]
      },
    ]

    this.header = [
      { key: 'pos', placeholder: 'Position' },
      { key: 'driver', placeholder: 'Driver' },
      { key: 'constructor', placeholder: 'Constructor' },
      { key: 'grid', placeholder: 'Grid' },
      { key: 'fl', placeholder: 'Fastest Lap' },
      { key: 'duration', placeholder: 'Race gap' },
      { key: 'points', placeholder: 'Points' },
    ]
    
    this.table = weekend.result.race.map((r, index) => ({
      key: index,
      data: [
        { key: 'pos', data: r.position },
        { key: 'driver', data: `${r.driver.fullName} ${r.driver.formattedNumber}` },
        { key: 'constructor', data: r.constructor.name },
        { key: 'grid', data: r.grid },
        { key: 'fl', data: [
          { key: 'fl-time', data: r.fastestLap.time },
          { key: 'fl-speed', data: r.fastestLap?.avgSpeed },
        ] },
        { key: 'duration', data: r.raceTime },
        { key: 'points', data: r.points },
      ]
    }))
  }

  // Drivers Race Status
  finished(weekend) {
    return weekend.result.race
      .filter(r => r.status.includes('Finished') || r.status.includes('+'))
      .length + ' drivers in this race'
  }

  gotALap(weekend) {
    return weekend.result.race
      .filter(r => r.status.includes('+'))
      .length + ' drivers in this race'
  }

  crashed(weekend) {
    return weekend.result.race
      .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
      .length + ' drivers in this race'
  }

  failures(weekend) {
    return weekend.result.race
      .filter(r => 
        !r.status.includes('Finished') || 
        !r.status.includes('+') || 
        !r.status.includes('Accident') || 
        !r.status.includes('Collision')
      )
      .length + ' drivers in this race'
  }
}

export default WeekendRaceListing
