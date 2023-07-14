// api
import { driverStandings } from "../../../api/standings"

// model
import Season from "../../season/Season"
import QueryError from "../../error/QueryError"

class DriversListing {
  static async query(year) {
    return driverStandings(year)
      .then(data => {
        const season = new Season(data)
        return new DriversListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  }

  constructor(season) {
    console.log('DriversListing - season: ', season)
    
    this.info = [
      {
        category: 'General Information',
        data: [
          { title: 'Season', desc: season.year },
          { title: 'Rounds', desc: season.standings.rounds },
        ]
      },
    ]

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
        { key: 'driver', data: `${result.driver.fullName} #${result.driver.number}` },
        { key: 'constructor', data: result.constructors[0].name },
        { key: 'nationality', data: result.driver.nationality },
        { key: 'wins', data: result.wins },
        { key: 'points', data: result.points },
      ]
    }))
  }
}

export default DriversListing
