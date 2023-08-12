// api
import { driverLaps } from "../../../../../../api/history"

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import ListingPaginationModel from "../../../../../../model/listing/ListingPagination"
import QueryError from "../../../../../../model/error/QueryError"

export const getDriverLapsQuery = ({ year, round, driverId, page }) => ({
  queryKey: ['listing', 'laps', year, round, driverId, page],
  queryFn: () => driverLaps(year, round, driverId, page)
    .then(({ info, data }) => {
      if (!data.Races || !data.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(data.Races[0])
      const pages = Math.ceil(info.total / info.limit)

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Lap Timings`,
          sub: `Selected Driver | ${getDriver(weekend)}`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Lap',
              accessorKey: 'lap',
              enableSorting: true
            },
            {
              header: 'Position',
              accessorKey: 'position',
              enableSorting: true
            },
            {
              header: 'Time',
              accessorKey: 'time',
              enableSorting: true
            },
          ],
          data: weekend.laps.map(lap => ({
            lap: lap.number,
            position: lap.timings[0].position,
            time: lap.timings[0].time
          }))
        }),
        pagination: new ListingPaginationModel({ pages })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

// Helper functions
const getDriver = weekend => (
  weekend.laps[0].timings[0].driverId
)
