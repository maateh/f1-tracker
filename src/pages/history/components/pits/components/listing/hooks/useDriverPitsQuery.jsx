import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverPitStops } from "../../../../../../../api/history"

// components
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"

// models
import WeekendModel from "../../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingTableModel from "../../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../../model/error/QueryError"

// icons

export const useDriverPitsQuery = () => {
  const { year, round, driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'pits', year, round, driverId],
    queryFn: () => driverPitStops(year, round, driverId)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }
  
        const weekend = new WeekendModel(data.Races[0])
  
        return new ListingModel({
          title: new ListingTitleModel({
            main: `${weekend.year} ${weekend.name} Pit Stops`,
            sub: `Selected Driver | ${weekend.pits[0].driverId}`
          }),
          table: new ListingTableModel({
            columns: [
              {
                placeholder: 'Exact Time',
                accessorKey: 'time',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell value={getValue().value} />
              },
              {
                placeholder: 'Lap',
                accessorKey: 'lap',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell value={getValue().value} />
              },
              {
                placeholder: 'Stops',
                accessorKey: 'stops',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell value={getValue().value} />
              },
              {
                placeholder: 'Duration',
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
              duration: { value: pit.duration },
            }))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}
