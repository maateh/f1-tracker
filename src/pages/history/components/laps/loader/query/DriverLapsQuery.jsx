// icons
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

// api
import { driverLaps } from "../../../../../../api/history"

// components
import SummaryCard from '../../../../../../components/listing/cards/card/SummaryCard'
import SingleTableCell from '../../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../../components/listing/table/cell/LinkingTableCell'
import TimeCell from '../../components/table/TimeCell'

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
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
        cards: new ListingCardsModel({
          styles: {
            margin: '2rem',
            display: 'flex',
            gap: '1.5rem'
          },
          layouts: [{
            title: 'Current Lap Information',
            summaries: [
              { title: 'Fastest Lap', desc: fastestLap(weekend), icon: <SpeedIcon /> },
              { title: 'Average Lap Time', desc: averageTime(weekend), icon: <AvTimerIcon /> },
              { title: 'Gained Positions', desc: gainedPositions(weekend), icon: <KeyboardDoubleArrowUpIcon /> },
            ]
          }].map(card => <SummaryCard key={card.title} card={card} />)
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Lap',
              accessorKey: 'lap',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <LinkingTableCell
                  value={getValue().value}
                  link={`../${weekend.year}/${weekend.round}/all?page=${getValue().value}`}
                  style={{ fontWeight: '500', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Position',
              accessorKey: 'position',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell value={getValue().value} />
            },
            {
              header: 'Time',
              accessorKey: 'time',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
                <TimeCell
                  time={getValue().value}
                />
            },
          ],
          data: weekend.laps.map(lap => ({
            lap: { value: +lap.number },
            position: { value: +lap.timings[0].position },
            time: { value: lap.timings[0].time }
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
const getDriver = weekend => weekend.laps[0].timings[0].driverId


const fastestLap = weekend => {
  return weekend.laps
    .reduce((acc, curr) =>
      acc.timings[0].getTimeInMs() < curr.timings[0].getTimeInMs() ? acc : curr
    ).timings[0].time
}

const averageTime = weekend => {
  const times = weekend.laps
    .reduce((acc, curr) => acc + curr.timings[0].getTimeInMs(), 0)
  const average = times / weekend.laps.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const gainedPositions = weekend => {
  return '... positions from the start of the race'
}
