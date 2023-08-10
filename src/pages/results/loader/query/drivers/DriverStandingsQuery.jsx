// api
import { driverStandings } from "../../../../../api/standings"

// models
import SeasonModel from '../../../../../model/season/Season'
import ListingModel from "../../../../../model/listing/Listing"
import ListingTableModel from "../../../../../model/listing/ListingTable"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import QueryError from '../../../../../model/error/QueryError'

export const getDriverStandingsQuery = ({ year }) => ({
  queryKey: ['listing', 'driverStandings', year],
  queryFn: () => driverStandings(year)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      if (!season.standings) {
        throw new QueryError('No data found!', 404)
      }

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Driver Standings`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
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
          data: season.standings.drivers.map(result => ({
            pos: result.position,
            driver: `${result.driver.fullName} ${result.driver.formattedNumber}`,
            constructor: result.constructors[0].name,
            nationality: result.driver.nationality,
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
