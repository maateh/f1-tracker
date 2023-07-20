// api
import { driverQualifyingsResults } from "../../../api/results"

// model
import Season from "../../season/Season"
import QueryError from "../../error/QueryError"

class DriverQualifyingsListing {
  static async query(year, driverId) {
    return driverQualifyingsResults(year, driverId)
      .then(data => {
        const season = new Season(data)
        if (!season.weekends) {
          throw new QueryError('No data found!', 404)
        }
        return new DriverQualifyingsListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(season) {
    console.log('DriverQualifyingsListing - season: ', season)
    this.season = season

    this.title = `${season.year} Qualifying Results - ${this.driver?.fullName} ${this.driver?.formattedNumber}`
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
          { title: 'Driver code, number', desc: `${this.driver?.code} ${this.driver?.formattedNumber}` },
        ]
      },
    ]

    this.header = [
      { key: 'round', placeholder: 'Round' },
      { key: 'weekend', placeholder: 'Weekend' },
      { key: 'date', placeholder: 'Date' },
      { key: 'circuit', placeholder: 'Circuit Name' },
      { key: 'q1', placeholder: 'Q1' },
      { key: 'q2', placeholder: 'Q2' },
      { key: 'q3', placeholder: 'Q3' },
      { key: 'pos', placeholder: 'Position' },
    ]

    this.table = season.weekends.map((w, index) => ({
      key: index,
      data: [
        { key: 'round', data: w.round },
        { key: 'weekend', data: w.name },
        { key: 'date', data: w.getFormattedDate('MMM dd.') },
        { key: 'circuit', data: w.circuit.name },
        { key: 'q1', data: w.result.qualifying[0].q1 },
        { key: 'q2', data: w.result.qualifying[0].q2 },
        { key: 'q3', data: w.result.qualifying[0].q3 },
        { key: 'pos', data: w.result.qualifying[0].position }
      ]
    }))
  }

  get driver() {
    return this.season.weekends[0]?.result.qualifying[0].driver
  }
}

export default DriverQualifyingsListing