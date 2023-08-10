// api
import { pitStops } from "../../../../../../api/history"

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"

export const getRoundPitsQuery = ({ year, round, page }) => ({
  queryKey: ['listing', 'pits', year, round, page],
  queryFn: () => pitStops(year, round, page)
    .then(({ info, data }) => {
      if (!data.Races || !data.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(data.Races[0])
      const pages = Math.ceil(info.total / info.limit)

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Pit Stops`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Stops',
              accessorKey: 'stops',
              enableSorting: true
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true
            },
            {
              header: 'Lap',
              accessorKey: 'lap',
              enableSorting: true
            },
            {
              header: 'Exact Time',
              accessorKey: 'time',
              enableSorting: true
            },
            {
              header: 'Duration',
              accessorKey: 'duration',
              enableSorting: true
            },
          ],
          data: weekend.pits.map(pit => ({
            stops: pit.stop,
            driver: pit.driverId,
            lap: pit.lap,
            time: pit.time,
            duration: pit.duration,
          })),
          pagination: +pages
        }),
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
