import { useQuery } from "react-query"
import { useLocation, useParams, useSearchParams } from "react-router-dom"

// api
import { raceLap } from "../../../../../../../api/history"
import { raceResults } from "../../../../../../../api/results"

// components
import SummaryCard from "../../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../../components/listing/table/cell/LinkingTableCell"
import TimeCell from "../components/table/TimeCell"

// models
import WeekendModel from "../../../../../../../model/season/weekend/Weekend"
import ResultModel from "../../../../../../../model/season/weekend/result/Result"
import ListingModel from "../../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

export const useRoundLapsQuery = () => {
  const { year, round } = useParams()
  const [searchParams] = useSearchParams()
  const lap = searchParams.get('page') || 1

  return useQuery({
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
        const pages = +resultsData.Races[0].Results[0].laps
  
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
                {
                  title: 'Drivers in race yet',
                  desc: driversInRace(currentLap),
                  icon: <SportsMotorsportsIcon />
                },
                {
                  title: 'Eliminated',
                  desc: eliminated(currentLap, prevLap, result),
                  icon: <RemoveCircleIcon />
                },
                {
                  title: 'Fastest Lap',
                  desc: fastestLap(currentLap, result),
                  icon: <SpeedIcon />
                },
                {
                  title: 'Average Lap Time',
                  desc: averageTime(currentLap),
                  icon: <AvTimerIcon />
                },
                {
                  title: 'Gained Positions',
                  desc: gainedPositions(currentLap, prevLap, result),
                  icon: <KeyboardDoubleArrowUpIcon />
                },
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
                cell: ({ cell: { getValue }}) => 
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
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell 
                    value={getValue().value}
                    link={`../${weekend.year}/${weekend.round}/${getValue().driver.id}`}
                    style={{ fontWeight: '500' }}
                  />
              },
              {
                header: 'Lap Time',
                accessorKey: 'time',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <TimeCell 
                    time={getValue().value}
                    gap={getValue().gap}
                  />
              },
            ],
            data: currentLap.timings.map(timing => ({
              position: { value: +timing.position },
              driver: { value: getDriver(timing.driverId, result).fullName, driver: getDriver(timing.driverId, result) },
              time: { value: timing.time, gap: gap(currentLap, timing.driverId) },
            }))
          }),
          pages: +pages
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Helper functions
const getDriver = (driverId, result) => {
  return result.find(r => r.driver.id === driverId).driver
}

// Card helpers
const driversInRace = lap => {
  return `${lap.timings.length} drivers in the race this lap`
}

const eliminated = (currentLap, prevLap, result) => {
  const initialAmount = prevLap && prevLap.timings ? prevLap.timings.length : result.length
	const eliminated = initialAmount - currentLap.timings.length
	return eliminated > 0
		? `${eliminated} drivers out from the race in this lap`
		: '-'
}

const fastestLap = (lap, result) => {
  const fastest = lap.timings
    .reduce((acc, curr) => (acc.getTimeInMs() || acc) < curr.getTimeInMs() ? acc : curr)
  return `${fastest.time} (${getDriver(fastest.driverId, result).code})`
}

const averageTime = lap => {
  const times = lap.timings
    .reduce((acc, curr) => acc + curr.getTimeInMs(), 0)
  const average = times / lap.timings.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const gainedPositions = (currentLap, prevLap, result) => {
  const gainedPositions = currentLap.timings.reduce((acc, timing) => {
    const prevPosition = prevLap 
      ? +prevLap.timings
        .find(({ driverId }) => timing.driverId === driverId)
        .position
      : +result
        .find((r => r.driver.id === timing.driverId))
        .position
    return prevPosition > timing.position 
      ? acc + prevPosition - +timing.position 
      : acc
  }, 0)
  return `${gainedPositions} gained positions in this lap`
}

// Table helpers
const gap = (lap, driverId) => {
  const firstTime = lap.timings[0].getTimeInMs()
  const driverTime = lap.timings
      .find(timing => timing.driverId === driverId)
      .getTimeInMs()

  const gap = firstTime > driverTime 
    ? new Date(firstTime - driverTime) 
    : new Date(driverTime - firstTime)

  const prefix = firstTime > driverTime ? '-' : '+'
  const minutes = gap.getMinutes() > 0 ? `${gap.getMinutes()}:` : ''
  return gap.getMilliseconds() === 0
    ? 'Reference time'
    : `${prefix}${minutes}${gap.getSeconds()}.${gap.getMilliseconds()}`
}
