import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { driverStandings } from "../../../../../../api/standings/season/driverStandings"

// components
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import PointsCell from '../../components/table/PointsCell'

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from "../../../../../../model/listing/Title"
import TableModel from "../../../../../../model/listing/Table"

const useDriverStandingsQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setTitle, setTable } = useListingContext()
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => driverStandings(year)
      .then(({ standings }) => {
 
        setTitle({
          title: new TitleModel({
            main: `${year} Driver Standings`
          })
        })

        setTable({
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
                header: 'Driver',
                accessorKey: 'driver',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={`${getValue().value} ${getValue().driver.formattedNumber}`}
                    link={`/results/${year}/drivers/${getValue().driver.id}/race`}
                    launchIcon={false}
                    style={{ fontWeight: '500', fontSize: '1.15rem' }}
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
                    launchIcon={false}
                    style={{ fontWeight: '500', fontSize: '1.1rem' }}
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
            data: standings.drivers.map(result => ({
              pos: { value: +result.position },
              driver: {
                value: result.driver.fullName,
                driver: result.driver
              },
              constructor: {
                value: result.constructors[0].name,
                constructor: result.constructors[0]
              },
              nationality: { value: result.driver.nationality },
              wins: { value: +result.wins },
              points: { value: +result.points },
            }))
          })
        })
      }),
    onError: err => showBoundary(err)
  })
}

export default useDriverStandingsQuery
