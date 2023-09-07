import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverLaps } from "../../../../../../../api/laps/driverLaps"
import { driverRaceResults } from "../../../../../../../api/results/race/driverRaceResults"

// components
import SummaryCard from "../../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"
import GainedInfoCell from "../components/table/GainedInfoCell"
import TimeCell from '../components/table/TimeCell'

// models
import WeekendModel from "../../../../../../../model/season/weekend/Weekend"
import RaceModel from "../../../../../../../model/season/weekend/results/race/Race"
import ListingModel from "../../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import SportsScoreIcon from '@mui/icons-material/SportsScore'

const useDriverLapsQuery = () => {
  const { year, round, driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'laps', year, round, driverId],
    queryFn: () => Promise.all([
      driverLaps(year, round, driverId), 
      driverRaceResults(year, round, driverId)
    ])
      .then(([{ info, data: lapsData }, { data: resultsData }]) => {
        if (!lapsData.Races || !lapsData.Races.length) {
          throw new QueryError('No data found!', 404)
        }
  
        const { year, round, name, laps } = WeekendModel.parser({ Race: lapsData.Races[0] })
        const pages = Math.ceil(info.total / 20)
        
        const result = RaceModel.parser({ Result: resultsData.Races[0].Results[0] })
        const { driver } = result

        return new ListingModel({
          title: new ListingTitleModel({
            main: `${year} ${name} Lap Timings`,
            sub: `Selected Driver | ${driver.fullName}`
          }),
          cards: new ListingCardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [{
              title: "Driver's Race Information",
              summaries: [
                {
                  title: 'Fastest Lap Time',
                  desc: fastestTime(laps),
                  icon: <SpeedIcon />
                },
                {
                  title: 'Average Lap Time',
                  desc: averageTime(laps),
                  icon: <AvTimerIcon />
                },
                {
                  title: 'Starting Grid Position',
                  desc: startingPosition(result),
                  icon: <UnfoldLessDoubleIcon />
                },
                {
                  title: 'Final Result',
                  desc: finalResult(result),
                  icon: <SportsScoreIcon />
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
                  <GainedInfoCell
                    value={`#${getValue().value}`}
                    gained={getValue().gained}
                    link={`../${year}/${round}/all?page=${getValue().value}`}
                    style={{ fontWeight: '500', fontSize: '1.2rem' }}
                  />
              },
              {
                header: 'Position',
                accessorKey: 'position',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: 500 }}
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
            data: laps.map((lap, index) => ({
              lap: {
                value: +lap.number,
                gained: gainedForRound(lap.timings[0], result, laps, index)
              },
              position: { value: +lap.timings[0].position },
              time: {
                value: lap.timings[0].time,
                gap: gap(lap.timings[0], laps, index)
              }
            })),
            pageQuantity: +pages
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Card helpers
const fastestTime = laps => {
	return laps.reduce((acc, curr) =>
		acc.timings[0].getTimeInMs() < curr.timings[0].getTimeInMs() ? acc : curr
	).timings[0].time
}

const averageTime = laps => {
  const times = laps
    .reduce((acc, curr) => acc + curr.timings[0].getTimeInMs(), 0)
  const average = times / laps.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const startingPosition = result => {
  return isNaN(+result.grid)
    ? 'Started from PIT LANE'
    : `#${result.grid} on the starting grid`
}

const finalResult = result => {
  return `#${result.position} at the end of the race (${result.status})`
}

const gained = (laps, result) => {
  const startedPosition = isNaN(+result.grid) 
    ? +laps[0].timings[0].position
    : +result.grid
  return startedPosition - +result.position
}

const gainedTitle = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return isNaN(gainedPositions) || gainedPositions === 0 ? '' 
    : gainedPositions > 0 ? 'Gained Positions' 
    : 'Lost Positions'
}

const gainedPositions = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return isNaN(gainedPositions) || gainedPositions === 0 ? ''
    : gainedPositions > 0 ? `Gained ${gainedPositions} positions from the start of the race`
    : `Lost ${Math.abs(gainedPositions)} positions from the start of the race`
}

const gainedIcon = (laps, result) => {
  const gainedPositions = gained(laps, result)
  return isNaN(gainedPositions) || gainedPositions === 0 ? ''
    : gainedPositions > 0 ? <KeyboardDoubleArrowUpIcon /> 
    : <KeyboardDoubleArrowDownIcon />
}

// Table helpers
const gainedForRound = (timing, result, laps, index) => {
  let prevPosition = index > 0
    ? laps[index - 1].timings[0].position
    : result.grid
  prevPosition = isNaN(prevPosition) ? timing.position : prevPosition
  
  const differential = timing.position - prevPosition
  const prefix = differential > 0 ? '-' : '+'
  return differential === 0
    ? ''
    : `${prefix}${Math.abs(differential)}`
}

const gap = (timing, laps, index) => {
  const prevTiming = index > 0 
    ? laps[index - 1].timings[0] 
    : timing

  const currentLapTimeInMs = timing.getTimeInMs()
  const prevLapTimeInMs = prevTiming.getTimeInMs()

  const gap = currentLapTimeInMs > prevLapTimeInMs
    ? new Date(currentLapTimeInMs - prevLapTimeInMs) 
    : new Date(prevLapTimeInMs - currentLapTimeInMs)

  const prefix = currentLapTimeInMs > prevLapTimeInMs ? '+' : '-'
  const minutes = gap.getMinutes() > 0 ? `${gap.getMinutes()}:` : ''
  const ms = gap.getMilliseconds().toString().padStart(3, '0')

  return currentLapTimeInMs === prevLapTimeInMs
    ? 'First Lap Time'
    : `${prefix}${minutes}${gap.getSeconds()}.${ms}`
}

export default useDriverLapsQuery
