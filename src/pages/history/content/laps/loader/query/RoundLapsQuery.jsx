// api
import { raceLap } from "../../../../../../api/history"
import { raceResults } from "../../../../../../api/results"

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"
import ListingTitle from "../../../../../../model/listing/ListingTitle"

export const getRoundLapsQuery = ({ year, round, page: lap }) => ({
  queryKey: ['listing', 'laps', year, round, lap],
  queryFn: () => Promise.all([raceLap(year, round, lap), raceResults(year, round, { limit: 1 })])
    .then(([{ data: lapData }, { data: resultsData }]) => {
      if (!lapData.Races || !lapData.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(lapData.Races[0])
      const pages = resultsData.Races[0].Results[0].laps

      return new ListingModel({
        title: new ListingTitle({
          main: `${weekend.year} ${weekend.name} Lap Timings`,
          sub: `Selected Lap | #${getCurrentLap(weekend).number}`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'position',
              enableSorting: true
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true
            },
            {
              header: 'Time',
              accessorKey: 'time',
              enableSorting: true
            },
          ],
          data: getCurrentLap(weekend).timings.map(timing => ({
            position: `#${timing.position}`,
            driver: timing.driverId,
            time: timing.time,
          })),
          pagination: +pages
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

// Helper functions
const getCurrentLap = weekend => (
  weekend.laps[0]
)
