import { useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { raceLap } from "../../../../../../../api/laps/raceLap"
import { weekendRaceResults } from "../../../../../../../api/results/race/weekendRaceResults"

// components
import SummaryCard from "../../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"
import GainedInfoCell from "../components/table/GainedInfoCell"
import TimeCell from "../components/table/TimeCell"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import TableModel from "../../../../../../../model/listing/Table"

// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SpeedIcon from '@mui/icons-material/Speed'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import PaginationModel from "../../../../../../../model/listing/Pagination"

const useRoundLapsListingQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setTitle, setCards, setTable, setPagination } = useListingContext()
  const { year, round } = useParams()
  const [searchParams] = useSearchParams()
  const lap = searchParams.get('page') || 1

  return useQuery({
    queryKey: ['listing', 'laps', year, round, lap],
    queryFn: () => Promise.all([
      raceLap(year, round, lap),
      weekendRaceResults(year, round),
      lap > 1 && raceLap(year, round, lap - 1)
    ])
      .then(([{ weekend }, { weekend: weekendWithRaceResults }, { weekendWithPrevLap }]) => {        
        const currentLap = weekend.laps[0]
        const results = weekendWithRaceResults.results.race
        const prevLap = weekendWithPrevLap && weekendWithPrevLap.laps[0]
  
        setTitle({
          title: new TitleModel({
            main: `${year} ${weekend.name} Lap Timings`,
            sub: `Selected Lap | #${currentLap.number}`
          })
        })

        setCards({
          cards: new CardsModel({
            styles: CardsModel.FLEX_STYLES,
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
                  desc: eliminated(currentLap, prevLap, results),
                  icon: <RemoveCircleIcon />
                },
                {
                  title: 'Fastest Lap',
                  desc: fastestLap(currentLap, results),
                  icon: <SpeedIcon />
                },
                {
                  title: 'Average Lap Time',
                  desc: averageTime(currentLap),
                  icon: <AvTimerIcon />
                },
                {
                  title: 'Gained Positions',
                  desc: gainedPositions(currentLap, prevLap, results),
                  icon: <KeyboardDoubleArrowUpIcon />
                },
              ]
            }].map(card => <SummaryCard key={card.title} card={card} />)
          })
        })

        setTable({
          table: new TableModel({
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
                  <GainedInfoCell 
                    value={getValue().value}
                    gained={getValue().gained}
                    link={`../${year}/${round}/${getValue().driver.id}`}
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
              driver: {
                value: getDriver(timing.driverId, results).fullName, 
                driver: getDriver(timing.driverId, results),
                gained: driverGainedPositions(timing, prevLap, results)
              },
              time: { value: timing.time, gap: gap(currentLap, timing.driverId) },
            }))
          })
        })

        setPagination({
          pagination: new PaginationModel({
            pageQuantity: results[0].laps
          })
        })
      }),
    onError: err => showBoundary(err)
  })
}

// Helper functions
const getDriver = (driverId, results) => {
  return results.find(r => r.driver.id === driverId).driver
}

// Card helpers
const driversInRace = lap => {
  return `${lap.timings.length} drivers in the race this lap`
}

const eliminated = (currentLap, prevLap, results) => {
  const initialAmount = prevLap && prevLap.timings ? prevLap.timings.length : results.length
	const eliminated = initialAmount - currentLap.timings.length
	return eliminated > 0
		? `${eliminated} drivers out from the race in this lap`
		: '-'
}

const fastestLap = (lap, results) => {
  const fastest = lap.timings
    .reduce((acc, curr) => (acc.getTimeInMs() || acc) < curr.getTimeInMs() ? acc : curr)
  return `${fastest.time} (${getDriver(fastest.driverId, results).code})`
}

const averageTime = lap => {
  const times = lap.timings
    .reduce((acc, curr) => acc + curr.getTimeInMs(), 0)
  const average = times / lap.timings.length
  const time = new Date(average)
  return `${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
}

const gainedPositions = (currentLap, prevLap, results) => {
  const gainedPositions = currentLap.timings.reduce((acc, timing) => {
    const prevPosition = prevLap 
      ? +prevLap.timings
        .find(({ driverId }) => timing.driverId === driverId)
        .position
      : +results
        .find(r => r.driver.id === timing.driverId)
        .position
    return prevPosition > timing.position 
      ? acc + prevPosition - +timing.position 
      : acc
  }, 0)
  return `${gainedPositions} gained positions in this lap`
}

// Table helpers
const driverGainedPositions = (timing, prevLap, results) => {
  let prevPosition = prevLap
    ? prevLap.timings.find(t => t.driverId === timing.driverId).position
    : results.find(r => r.driver.id === timing.driverId).grid
  prevPosition = isNaN(prevPosition) ? timing.position : prevPosition

  const differential = timing.position - prevPosition
  const prefix = differential > 0 ? '-' : '+'
  return differential === 0
    ? ''
    : `${prefix}${Math.abs(differential)}`
}

const gap = (lap, driverId) => {
  const refTime = lap.timings[0].getTimeInMs()
  const driverTime = lap.timings
      .find(timing => timing.driverId === driverId)
      .getTimeInMs()

  const gap = refTime > driverTime 
    ? new Date(refTime - driverTime) 
    : new Date(driverTime - refTime)

  const prefix = refTime > driverTime ? '-' : '+'
  const minutes = gap.getMinutes() > 0 ? `${gap.getMinutes()}:` : ''
  const ms = gap.getMilliseconds().toString().padStart(3, '0')

  return refTime === driverTime
    ? 'Reference time'
    : `${prefix}${minutes}${gap.getSeconds()}.${ms}`
}

export default useRoundLapsListingQuery
