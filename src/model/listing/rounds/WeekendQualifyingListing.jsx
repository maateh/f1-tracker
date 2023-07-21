// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

// api
import { qualifyingResults } from "../../../api/results"

// model
import Weekend from "../../season/weekend/Weekend"
import QueryError from "../../error/QueryError"

class WeekendQualifyingListing {
  static async query(year, round) {
    return qualifyingResults(year, round)
      .then(data => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }
        const weekend = new Weekend(data.Races[0])
        return new WeekendQualifyingListing(weekend)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(weekend) {
    this.title = `${weekend.year} ${weekend.name} Qualifying Results`
    
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
    ]

    this.header = [
      { key: 'pos', placeholder: 'Position' },
      { key: 'driver', placeholder: 'Driver' },
      { key: 'constructor', placeholder: 'Constructor' },
      { key: 'q1', placeholder: 'Q1' },
      { key: 'q2', placeholder: 'Q2' },
      { key: 'q3', placeholder: 'Q3' },
    ]
    
    this.table = weekend.result.qualifying.map((r, index) => ({
      key: index,
      data: [
        { key: 'pos', data: r.position },
        { key: 'driver', data: `${r.driver.fullName} ${r.driver.formattedNumber}` },
        { key: 'constructor', data: r.constructor.name },
        { key: 'q1', data: r.q1 },
        { key: 'q2', data: r.q2 },
        { key: 'q3', data: r.q3 },
      ]
    }))
  }
}

export default WeekendQualifyingListing