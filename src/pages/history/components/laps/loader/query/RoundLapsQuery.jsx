// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

// api
import { raceLap } from "../../../../../../api/history"
import { raceResults } from "../../../../../../api/results"

// components
import SummaryCard from '../../../../../../components/listing/cards/card/SummaryCard'
import SingleTableCell from '../../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../../components/listing/table/cell/LinkingTableCell'
import TimeCell from '../../components/table/TimeCell'

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ResultModel from '../../../../../../model/season/weekend/result/Result'
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import ListingPaginationModel from "../../../../../../model/listing/ListingPagination"
import QueryError from "../../../../../../model/error/QueryError"

export const getRoundLapsQuery = ({ year, round, page: lap }) => ({
  queryKey: ['listing', 'laps', year, round, lap],
  queryFn: () => Promise.all([
    raceLap(year, round, lap),
    raceResults(year, round),
    lap > 1 && raceLap(year, round, lap - 1)
  ])
    .then(([{ data: lapData }, { data: resultsData }, { data: prevLapData }]) => {
      if (!lapData.Races || !lapData.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(lapData.Races[0])
      const currentLap = weekend.laps[0]
      const pages = resultsData.Races[0].Results[0].laps
      const { race: result } = new ResultModel(resultsData.Races[0])
      const prevLap = prevLapData && new WeekendModel(prevLapData.Races[0]).laps[0]

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Lap Timings`,
          sub: `Selected Lap | #${currentLap.number}`
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
              { title: 'Drivers in race yet', desc: driversInRace(currentLap), icon: <SportsMotorsportsIcon /> },
              { title: 'Eliminated', desc: eliminated(currentLap, prevLap, result), icon: <RemoveCircleIcon /> },
              { title: 'Fastest Lap', desc: fastestLap(currentLap), icon: <SpeedIcon /> },
              { title: 'Average Lap Time', desc: averageTime(currentLap), icon: <AvTimerIcon /> },
              { title: 'Overtakes', desc: overtakes(currentLap), icon: <KeyboardDoubleArrowUpIcon /> },
            ]
          }].map(card => <SummaryCard key={card.title} card={card} />)
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'position',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue } }) => 
                <SingleTableCell 
                  value={`#${getValue().value}`}
                  style={{ fontSize: '1.2rem', fontWeight: 600 }}
                />
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue } }) => 
                <LinkingTableCell 
                  value={getValue().value}
                  link={`../${weekend.year}/${weekend.round}/${getValue().driver.id}`}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Time',
              accessorKey: 'time',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue } }) => 
                <TimeCell 
                  time={getValue().value}
                />
            },
          ],
          data: currentLap.timings.map(timing => ({
            position: { value: +timing.position },
            driver: { value: getDriver(timing.driverId, result).fullName, driver: getDriver(timing.driverId, result) },
            time: { value: timing.time },
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
const getDriver = (driverId, result) => 
  result.find(r => r.driver.id === driverId).driver


// Card & Table helpers
const driversInRace = lap => `${lap.timings.length} drivers in the race this lap`

const eliminated = (currentLap, prevLap, result) => {
  const initialAmount = prevLap && prevLap.timings ? prevLap.timings.length : result.length
	const eliminated = initialAmount - currentLap.timings.length
	return eliminated > 0
		? `${eliminated} drivers out from the race in this lap`
		: '-'
}

const fastestLap = lap => {
  const fastest = lap.timings
    .reduce((acc, curr) => (acc.getTimeInMs() || acc) < curr.getTimeInMs() ? acc : curr)
  return `${fastest.time} (${fastest.driverId})`
}

const averageTime = lap => {
  const times = lap.timings
    .reduce((acc, curr) => acc + curr.getTimeInMs(), 0)
  const average = times / lap.timings.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const overtakes = (currentLap, prevLap) => {
  return '... overtakes in this lap'
}
