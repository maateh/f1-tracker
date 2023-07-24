// api
import { constructorStandings } from "../../../../api/standings"

// models
import Season from "../../../season/Season"
import QueryError from "../../../error/QueryError"

class ConstructorStandingsListing {
  static async query(year) {
    return constructorStandings(year)
      .then(data => {
        const season = new Season(data)
        if (!season.standings) {
          throw new QueryError('No data found!', 404)
        }
        return new ConstructorStandingsListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(season) {
    this.title = `${season.year} Constructor Standings`
    
    this.header = [
      { key: 'pos', placeholder: 'Position' },
      { key: 'constructor', placeholder: 'Constructor' },
      { key: 'nationality', placeholder: 'Nationality' },
      { key: 'wins', placeholder: 'Wins' },
      { key: 'points', placeholder: 'Points' },
    ]

    this.table = season.standings.constructors.map((result, index) => ({
      key: index,
      data: [
        { key: 'pos', data: result.position },
        { key: 'constructor', data: result.constructor.name },
        { key: 'nationality', data: result.constructor.nationality },
        { key: 'wins', data: result.wins },
        { key: 'points', data: result.points },
      ]
    }))
  }
}

export default ConstructorStandingsListing
