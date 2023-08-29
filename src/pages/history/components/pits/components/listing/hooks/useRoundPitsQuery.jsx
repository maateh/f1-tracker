import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { pitStops } from "../../../../../../../api/history"
import { driverList } from "../../../../../../../api/season"

// components
import SummaryCard from "../../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../../components/listing/table/cell/LinkingTableCell"
import DurationCell from "../components/table/DurationCell"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import WeekendModel from "../../../../../../../model/season/weekend/Weekend"
import PitStopModel from "../../../../../../../model/season/weekend/pit/PitStop"
import ListingModel from "../../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import CalculateIcon from '@mui/icons-material/Calculate'
import TimelapseIcon from '@mui/icons-material/Timelapse'

const useRoundPitsQuery = () => {
  const { year, round } = useParams()

  return useQuery({
    queryKey: ['listing', 'pits', year, round],
    queryFn: () => Promise.all([
      pitStops(year, round),
      driverList(year)
    ])
      .then(([{ info, data: pitsData }, { data: driversData }]) => {
        if (!pitsData.Races || !pitsData.Races.length) {
          throw new QueryError('No data found!', 404)
        }
  
        const { year, round, name, pits } = WeekendModel.parser({
					Race: pitsData.Races[0],
				})
        const { drivers } = SeasonModel.parser({ data: driversData })
        const pages = Math.ceil(info.total / 20)

        const fastestPit = getFastestPit(pits)
  
        return new ListingModel({
          title: new ListingTitleModel({
            main: `${year} ${name} Pit Stops`
          }),
          cards: new ListingCardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [{
              title: 'Pit Stops Information',
              summaries: [
                {
                  title: 'Pit Stops',
                  desc: pitStopsAmount(pits),
                  icon: <LocalParkingIcon />
                },
                {
                  title: 'Average Pits per Driver',
                  desc: averagePerDriver(pits),
                  icon: <CalculateIcon />
                },
                {
                  title: 'Average Duration',
                  desc: averageDuration(pits),
                  icon: <TimelapseIcon />
                }
              ]
            }].map(card => <SummaryCard key={card.title} card={card} />)
          }),
          table: new ListingTableModel({
            columns: [
              {
                header: 'Exact Time',
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
                header: 'Lap',
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
                header: 'Stops',
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
                header: 'Driver',
                accessorKey: 'driver',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell 
                    value={getValue().value} 
                    link={`../${year}/${round}/${getValue().driver.id}`}
                    style={{ fontSize: '1.1rem', fontWeight: '500' }}
                  />
              },
              {
                header: 'Pit Duration',
                accessorKey: 'duration',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <DurationCell
                    duration={getValue().value}
                    gap={getValue().gap}
                    style={{ fontSize: '1.3rem', fontWeight: '400' }}
                  />
              },
            ],
            data: pits.map(pit => ({
              time: { value: pit.time },
              lap: { value: +pit.lap },
              stops: { value: +pit.stop },
              driver: {
                value: getDriver(pit.driverId, drivers).fullName,
                driver: getDriver(pit.driverId, drivers)
              },
              duration: {
                value: pit.duration,
                gap: gap(pit, fastestPit)
              }
            })),
            pages: +pages
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Helpers
const getDriver = (driverId, drivers) => {
  return drivers.find(driver => driver.id === driverId)
}

const getFastestPit = pits => {
	return pits.reduce((prev, curr) =>
		prev.getDurationInMs() > curr.getDurationInMs() ? curr : prev
	)
}

// Card helpers
const pitStopsAmount = pits => {
  return `There were ${pits.length} pit stops in this race`
}

const averagePerDriver = pits => {
  const drivers = pits.map(pit => pit.driverId)
  const average = +pits.length / new Set(drivers).size
  return `There were ${average.toFixed(2)} pit stops on average`
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

export default useRoundPitsQuery
