// api
import { constructorStandings } from "../../../../../api/standings"

// models
import SeasonModel from '../../../../../model/season/Season'
import ListingModel from '../../../../../model/listing/Listing'
import ListingTitleModel from '../../../../../model/listing/ListingTitle'
import ListingTableModel from '../../../../../model/listing/ListingTable'
import QueryError from '../../../../../model/error/QueryError'

export const getConstructorStandingsQuery = ({ year }) => ({
  queryKey: ['listing', 'constructorStandings', year],
  queryFn: () => constructorStandings(year)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      if (!season.standings) {
        throw new QueryError('No data found!', 404)
      }
      
      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Constructor Standings`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true
            },
            {
              header: 'Constructor',
              accessorKey: 'constructor',
              enableSorting: true
            },
            {
              header: 'Nationality',
              accessorKey: 'nationality',
              enableSorting: true
            },
            {
              header: 'Wins',
              accessorKey: 'wins',
              enableSorting: true
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true
            },
          ],
          data: season.standings.constructors.map(result => ({
            pos: result.position,
            constructor: result.constructor.name,
            nationality: result.constructor.nationality,
            wins: result.wins,
            points: result.points,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
