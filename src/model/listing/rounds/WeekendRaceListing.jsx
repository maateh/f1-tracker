// api
import { raceResults } from "../../../api/results"

// model
import Weekend from "../../season/weekend/Weekend"
import QueryError from "../../error/QueryError"

class WeekendRaceListing {
  static async query(year, round) {
    return raceResults(year, round)
      .then(data => {
        const weekend = new Weekend(data.Races[0])
        return new WeekendRaceListing(weekend)
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  }

  constructor(weekend) {
    console.log('WeekendListing - weekend: ', weekend)

    this.info = [
      {
        category: 'General Information',
        data: [
          { title: 'Weekend', desc: weekend.name },
          { title: 'Round of the Season', desc: weekend.round },
        ]
      },
      {
        category: 'Circuit Information',
        data: [
          { title: 'Circuit Name', desc: weekend.circuit.name },
          { title: 'Country', desc: weekend.circuit.location.country },
          { title: 'Locality', desc: weekend.circuit.location.locality },
          { title: 'More info', desc: 'link to wiki' },
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
        { key: 'driver', data: `${r.driver.fullName} #${r.driver.number}` },
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
}

export default WeekendRaceListing