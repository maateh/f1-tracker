// api
import { driverStandings } from "../../../../../api/standings"

// components
import SingleTableCell from "../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../components/listing/table/cell/LinkingTableCell"
import PointsCell from "../../../components/table/PointsCell"

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
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue } }) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '600', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <LinkingTableCell
                  value={getValue().value}
                  link={`/results/${season.year}/drivers/${getValue().driver.id}/race`}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Constructor',
              accessorKey: 'constructor',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <LinkingTableCell
                  value={getValue().value}
                  link={`/results/${season.year}/constructors/${getValue().constructor.id}`}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Nationality',
              accessorKey: 'nationality',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Wins',
              accessorKey: 'wins',
              enableSorting: true,
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true,
              cell: ({ cell: { getValue }}) => 
                <PointsCell points={getValue().value} />
            },
          ],
          data: season.standings.drivers.map(result => ({
            pos: { value: +result.position },
            driver: { value: result.driver.fullName, driver: result.driver },
            constructor: { value: result.constructors[0].name, constructor: result.constructors[0] },
            nationality: { value: result.driver.nationality },
            wins: { value: +result.wins },
            points: { value: +result.points },
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
