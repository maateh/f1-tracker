import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { driverPitStops } from "../../../../../../../api/pitstops/driverPitStops"
import { driver } from "../../../../../../../api/drivers/driver"

// components
import SummaryCard from "../../../../../../../components/listing/cards/components/summary/SummaryCard"
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"
import DurationCell from "../components/table/DurationCell"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import PitStopModel from "../../../../../../../model/season/weekend/pit/PitStop"
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import TableModel from "../../../../../../../model/listing/Table"

// icons
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import TimelapseIcon from '@mui/icons-material/Timelapse'

const useDriverPitsListingQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setTitle, setCards, setTable } = useListingContext()
  const { year, round, driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'pits', year, round, driverId],
    queryFn: () => Promise.all([
      driverPitStops(year, round, driverId),
      driver(driverId)
    ])
      .then(([{ weekend }, { driver }]) => {
        const fastestPit = getFastestPit(weekend.pits)
  
        setTitle({
          title: new TitleModel({
            main: `${weekend.year} ${weekend.name} Pit Stops`,
            sub: `Selected Driver | ${driver.fullName}`
          })
        })

        setCards({
          cards: new CardsModel({
            styles: CardsModel.FLEX_STYLES,
            layouts: [{
              title: "Driver's Pit Stops Information",
              summaries: [
                {
                  title: 'Pit Stops',
                  desc: pitStopsAmount(weekend.pits),
                  icon: <LocalParkingIcon />
                },
                {
                  title: 'Average Duration',
                  desc: averageDuration(weekend.pits),
                  icon: <TimelapseIcon />
                }
              ]
            }].map(card => <SummaryCard key={card.title} card={card} />)
          })
        })

        setTable({
          table: new TableModel({
            columns: [
              {
                placeholder: 'Exact Time',
                accessorKey: 'time',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell 
                    value={getValue().value}
                    style={{ fontSize: '1.15rem', fontWeight: '500' }}
                  />
              },
              {
                placeholder: 'Lap',
                accessorKey: 'lap',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell
                    value={`#${getValue().value}`}
                    style={{ fontSize: '1.1rem', fontWeight: '600' }}
                  />
              },
              {
                placeholder: 'Stops',
                accessorKey: 'stops',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) =>
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontSize: '1.1rem', fontWeight: '600' }}
                  />
              },
              {
                placeholder: 'Pit Duration',
                accessorKey: 'duration',
                enableSorting: true,
                sortingFn: 'duration',
                cell: ({ cell: { getValue }}) =>
                  <DurationCell
                    duration={getValue().value}
                    gap={getValue().gap}
                    style={{ fontSize: '1.3rem', fontWeight: '400' }}
                  />
              },
            ],
            data: weekend.pits.map(pit => ({
              time: { value: pit.time },
              lap: { value: +pit.lap },
              stops: { value: +pit.stop },
              duration: { value: pit.duration, gap: gap(pit, fastestPit) },
            }))
          })
        })
      }),
    onError: err => showBoundary(err)
  })
}

// Helpers
const getFastestPit = pits => {
	return pits.reduce((prev, curr) =>
		prev.getDurationInMs() > curr.getDurationInMs() ? curr : prev
	)
}

// Card helpers
const pitStopsAmount = pits => {
  return `There were ${pits.length} pit stops in this race`
}

const averageDuration = pits => {
  let numberOfRelevantPits = 0
  const sumInMs = pits.reduce((acc, curr) => {
    const currentDuration = curr.getDurationInMs()
    if (currentDuration <= PitStopModel.MAX_GAP) {
      numberOfRelevantPits++
      return acc + currentDuration
    }
    return acc
  }, 0)

  const average = new Date(sumInMs / numberOfRelevantPits)

  const seconds = average.getSeconds()
  const ms = average.getMilliseconds()
    .toString()
    .padStart(3, '0')
  return `The average duration was ${seconds}.${ms} seconds`
}

// Table helpers
const gap = (pit, fastestPit) => {
  const refTime = fastestPit.getDurationInMs()
  const pitTime = pit.getDurationInMs()

  const gap = refTime > pitTime 
    ? new Date(refTime - pitTime) 
    : new Date(pitTime - refTime)

  const ms = gap.getMilliseconds()
    .toString()
    .padStart(3, '0')

  return refTime === pitTime
    ? 'Reference time'
    : gap > PitStopModel.MAX_GAP ? 'RED FLAG'
    : `+${gap.getSeconds()}.${ms}`
}

export default useDriverPitsListingQuery
