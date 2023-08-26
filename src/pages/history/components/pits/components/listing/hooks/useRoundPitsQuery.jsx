import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { pitStops } from "../../../../../../../api/history"

// components
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"

// models
import WeekendModel from "../../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingTableModel from "../../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../../model/error/QueryError"
import LinkingTableCell from "../../../../../../../components/listing/table/cell/LinkingTableCell"

// icons

export const useRoundPitsQuery = () => {
  const { year, round } = useParams()

  return useQuery({
    queryKey: ['listing', 'pits', year, round],
    queryFn: () => pitStops(year, round)
      .then(({ info, data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }
  
        const weekend = new WeekendModel(data.Races[0])
        const pages = Math.ceil(info.total / 20)
  
        return new ListingModel({
          title: new ListingTitleModel({
            main: `${weekend.year} ${weekend.name} Pit Stops`
          }),
          table: new ListingTableModel({
            columns: [
              {
                header: 'Exact Time',
                accessorKey: 'time',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell value={getValue().value} />
              },
              {
                header: 'Lap',
                accessorKey: 'lap',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell value={getValue().value} />
              },
              {
                header: 'Stops',
                accessorKey: 'stops',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell value={getValue().value} />
              },
              {
                header: 'Driver',
                accessorKey: 'driver',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell 
                    value={getValue().value} 
                    link={`../${weekend.year}/${weekend.round}/${getValue().value}`}
                  />
              },
              {
                header: 'Duration',
                accessorKey: 'duration',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell value={getValue().value} />
              },
            ],
            data: weekend.pits.map(pit => ({
              time: { value: pit.time },
              lap: { value: +pit.lap },
              stops: { value: +pit.stop },
              driver: { value: pit.driverId },
              duration: { value: pit.duration },
            })),
            pages: +pages
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}
