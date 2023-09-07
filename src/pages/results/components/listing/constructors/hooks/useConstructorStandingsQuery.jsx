import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorStandings } from "../../../../../../api/standings/constructorStandings"

// components
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import PointsCell from "../../components/table/PointsCell"

// models
import SeasonModel from '../../../../../../model/season/Season'
import ListingModel from '../../../../../../model/listing/Listing'
import TitleModel from '../../../../../../model/listing/ListingTitle'
import TableModel from '../../../../../../model/listing/ListingTable'
import QueryError from '../../../../../../model/error/QueryError'

const useConstructorStandingsQuery = () => {
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'constructorStandings', year],
    queryFn: () => constructorStandings(year)
      .then(({ data }) => {
        const { year, standings } = SeasonModel.parser({ Season: data })
  
        if (!standings) {
          throw new QueryError('No data found!', 404)
        }
        
        return new ListingModel({
          title: new TitleModel({
            main: `${year} Constructor Standings`
          }),
          table: new TableModel({
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
                header: 'Constructor',
                accessorKey: 'constructor',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={getValue().value}
                    link={`/results/${year}/constructors/${getValue().constructor.id}`}
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
                sortingFn: 'default',
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
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <PointsCell points={getValue().value} />
              },
            ],
            data: standings.constructors.map(result => ({
              pos: { value: +result.position },
              constructor: {
                value: result.constructor.name,
                constructor: result.constructor
              },
              nationality: { value: result.constructor.nationality },
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
}

export default useConstructorStandingsQuery
