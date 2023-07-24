// api
import { driverStandings } from "../../../../api/standings"

// model
import Season from "../../../season/Season"
import QueryError from "../../../error/QueryError"

class DriverStandingsListing {
  static async query(year) {
    return driverStandings(year)
      .then(data => {
        const season = new Season(data)
        if (!season.standings) {
          throw new QueryError('No data found!', 404)
        }
        return new DriverStandingsListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(season) {    
    this.title = `${season.year} Driver Standings`

    this.header = [
      { key: 'pos', placeholder: 'Position' },
      { key: 'driver', placeholder: 'Driver' },
      { key: 'constructor', placeholder: 'Constructor' },
      { key: 'nationality', placeholder: 'Nationality' },
      { key: 'wins', placeholder: 'Wins' },
      { key: 'points', placeholder: 'Points' },
    ]

    this.table = season.standings.drivers.map((result, index) => ({
      key: index,
      data: [
        { key: 'pos', data: result.position },
        { key: 'driver', data: `${result.driver.fullName} ${result.driver.formattedNumber}` },
        { key: 'constructor', data: result.constructors[0].name },
        { key: 'nationality', data: result.driver.nationality },
        { key: 'wins', data: result.wins },
        { key: 'points', data: result.points },
      ]
    }))
  }
}

export default DriverStandingsListing
