// api
import { constructorStandings } from "../../../../../api/standings"

// components
import SingleTableCell from "../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../components/listing/table/cell/LinkingTableCell"
import PointsCell from "../../../components/table/PointsCell"

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
              enableSorting: true,
              cell: ({ cell: { getValue: getPosition } }) => 
                <SingleTableCell
                  data={getPosition()}
                  style={{ fontWeight: '600', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Constructor',
              accessorKey: 'constructor',
              enableSorting: true,
              cell: ({ cell: { getValue: getConstructor }}) => 
                <LinkingTableCell
                  data={getConstructor().name}
                  link={getConstructor().wiki}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Nationality',
              accessorKey: 'nationality',
              enableSorting: true,
              cell: ({ cell: { getValue: getNationality }}) => 
                <SingleTableCell
                  data={getNationality()}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Wins',
              accessorKey: 'wins',
              enableSorting: true,
              cell: ({ cell: { getValue: getWins }}) => 
                <SingleTableCell
                  data={getWins()}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true,
              cell: ({ cell: { getValue: getPoints }}) => 
                <PointsCell points={getPoints()} />
            },
          ],
          data: season.standings.constructors.map(result => ({
            pos: result.position,
            constructor: result.constructor,
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
