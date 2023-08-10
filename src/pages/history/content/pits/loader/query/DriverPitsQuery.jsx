// api
import { driverPitStops } from "../../../../../../api/history"

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"

export const getDriverPitsQuery = ({ year, round, driverId }) => ({
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
          sub: `Driver - ${weekend.pits[0].driverId}`
        }),
        table: new ListingTableModel({
          columns: [
            {
              placeholder: 'Stops',
              accessorKey: 'stops',
              enableSorting: true
            },
            {
              placeholder: 'Lap',
              accessorKey: 'lap',
              enableSorting: true
            },
            {
              placeholder: 'Exact Time',
              accessorKey: 'time',
              enableSorting: true
            },
            {
              placeholder: 'Duration',
              accessorKey: 'duration',
              enableSorting: true
            },
          ],
          data: weekend.pits.map(pit => ({
            stops: pit.stop,
            lap: pit.lap,
            time: pit.time,
            duration: pit.duration,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
