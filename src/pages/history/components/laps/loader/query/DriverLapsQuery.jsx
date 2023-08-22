// icons
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

// api
import { driverLaps } from "../../../../../../api/history"
import { driverRaceResults } from '../../../../../../api/results'

// components
import SummaryCard from '../../../../../../components/listing/cards/card/SummaryCard'
import SingleTableCell from '../../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../../components/listing/table/cell/LinkingTableCell'
import TimeCell from '../../components/table/TimeCell'

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import RaceModel from '../../../../../../model/season/weekend/result/race/Race'
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import ListingPaginationModel from "../../../../../../model/listing/ListingPagination"
import QueryError from "../../../../../../model/error/QueryError"

export const getDriverLapsQuery = ({ year, round, driverId, page }) => ({
  queryKey: ['listing', 'laps', year, round, driverId, page],
  queryFn: () => Promise.all([
    driverLaps(year, round, driverId, page), 
    driverRaceResults(year, round, driverId)
  ])
    .then(([{ info, data: lapsData }, { data: resultsData }]) => {
      if (!lapsData.Races || !lapsData.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(lapsData.Races[0])
      const { laps } = weekend
      const pages = Math.ceil(info.total / info.limit)

      const result = new RaceModel(resultsData.Races[0].Results[0])
      const { driver } = result

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Lap Timings`,
          sub: `Selected Driver | ${driver.fullName}`
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
              {
                title: 'Fastest Lap',
                desc: fastestLap(laps),
                icon: <SpeedIcon />
              },
              {
                title: 'Average Lap Time',
                desc: averageTime(laps),
                icon: <AvTimerIcon />
              },
              {
                title: gainedTitle(laps, result),
                desc: gainedPositions(laps, result),
                icon: gainedIcon(laps, result)
              },
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

// Card & Table helpers
const fastestLap = laps =>
	laps.reduce((acc, curr) =>
		acc.timings[0].getTimeInMs() < curr.timings[0].getTimeInMs() ? acc : curr
	).timings[0].time

const averageTime = laps => {
  const times = laps
    .reduce((acc, curr) => acc + curr.timings[0].getTimeInMs(), 0)
  const average = times / laps.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const gained = (laps, result) => +result.grid - +laps.pop().timings[0].position

const gainedTitle = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return gainedPositions === 0 || isNaN(gainedPositions) ? '' 
    : gainedPositions > 0 ? 'Gained Positions' 
    : 'Lost Positions'
}

const gainedPositions = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return gainedPositions === 0 || isNaN(gainedPositions) ? ''
    : gainedPositions > 0 ? `Gained ${gainedPositions} positions from the start of the race`
    : `Lost ${Math.abs(gainedPositions)} positions from the start of the race`
}

const gainedIcon = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return gainedPositions === 0 || isNaN(gainedPositions) ? ''
    : gainedPositions > 0 ? <KeyboardDoubleArrowUpIcon /> 
    : <KeyboardDoubleArrowDownIcon />
}
