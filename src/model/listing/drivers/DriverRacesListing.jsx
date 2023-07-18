// api
import { driverRacesResults } from "../../../api/results"

// model
import Season from "../../season/Season"
import QueryError from "../../error/QueryError"

class DriverRacesListing {
  static async query(year, driverId) {
    return driverRacesResults(year, driverId)
      .then(data => {
        const season = new Season(data)
        return new DriverRacesListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  }

  constructor(season) {
    console.log('DriverRacesListing - season: ', season)
    this.season = season

    this.title = `${this.driver?.fullName} ${season.year} Race Results`
    this.info = [
      {
        category: 'General Information',
        data: [
          { title: 'Season', desc: season.year },
          { title: 'Rounds', desc: season.weekends.length },
        ]
      },
      {
        category: 'Driver Information',
        data: [
          { title: 'Full Name', desc: this.driver?.fullName },
          { title: 'Nationality', desc: this.driver?.nationality },
          { title: 'Date of Birth', desc: this.driver?.dateOfBirth },
          { title: 'Driver code, number', desc: `${this.driver?.code} #${this.driver?.number}` },
        ]
      },
    ]

    this.header = [
      { key: 'round', placeholder: 'Round' },
      { key: 'weekend', placeholder: 'Weekend' },
      { key: 'circuit', placeholder: 'Circuit Name' },
      { key: 'grid', placeholder: 'Grid' },
      { key: 'fl', placeholder: 'Fastest Lap' },
      { key: 'position', placeholder: 'Position' },
      { key: 'points', placeholder: 'Points' },
      { key: 'laps', placeholder: 'Completed Laps' },
      { key: 'duration', placeholder: 'Race Gap' },
    ]

    this.table = season.weekends.map((w, index) => ({
      key: index,
      data: [
        { key: 'round', data: w.round },
        { key: 'weekend', data: w.name },
        { key: 'circuit', data: w.circuit.name },
        { key: 'grid', data: w.result.race[0].grid },
        { key: 'fl', data: [
          { key: 'fl-time', data: w.result.race[0].fastestLap.time },
          { key: 'fl-speed', data: w.result.race[0].fastestLap?.avgSpeed },
        ] },
        { key: 'position', data: w.result.race[0].position },
        { key: 'points', data: w.result.race[0].points },
        { key: 'laps', data: w.result.race[0].laps },
        { key: 'duration', data: w.result.race[0].raceTime }
      ]
    }))
  }

  get driver() {
    return this.season.weekends[0]?.result.race[0].driver
  }
}

export default DriverRacesListing