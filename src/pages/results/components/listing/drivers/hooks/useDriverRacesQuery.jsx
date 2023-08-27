import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

// api
import { driverRacesResults } from "../../../../../../api/results"

// components
import ResultsCard from "../../components/card/ResultsCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import CircuitCell from "../../components/table/CircuitCell"
import FastestLapCell from "../../components/table/FastestLapCell"
import PointsCell from '../../components/table/PointsCell'

// models
import SeasonModel from "../../../../../../model/season/Season"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"

// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import PublicIcon from '@mui/icons-material/Public'
import CakeIcon from '@mui/icons-material/Cake'
import TagIcon from '@mui/icons-material/Tag'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BoltIcon from '@mui/icons-material/Bolt'
import PlusOneIcon from '@mui/icons-material/PlusOne'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

export const useDriverRacesQuery = () => {
  const { year, id: driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'driverRacesResults', year, driverId],
    queryFn: () => driverRacesResults(year, driverId)
      .then(({ data }) => {
        const { year, weekends } = SeasonModel.parser({ data })
  
        if (!weekends) {
          throw new QueryError('No data found!', 404)
        }
  
        const driver = getDriver(weekends)

        return new ListingModel({
          title: new ListingTitleModel({
            main: `${year} Race Results`,
            sub: `Selected Driver | ${driver.fullName} ${driver.formattedNumber}`
          }),
          cards: new ListingCardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [
              {
                title: 'Driver Information',
                summaries: [
                  {
                    title: 'Full Name',
                    desc: driver.fullName, link: driver.wiki,
                    icon: <SportsMotorsportsIcon />
                  },
                  {
                    title: 'Nationality',
                    desc: driver.nationality,
                    icon: <PublicIcon />
                  },
                  {
                    title: 'Date of Birth',
                    desc: driver.dateOfBirth,
                    icon: <CakeIcon />
                  },
                  {
                    title: 'Driver code, number',
                    desc: `${driver.code} ${driver.formattedNumber}`,
                    icon: <TagIcon />
                  },
                ]
              },
              {
                title: 'Driver Achievements',
                summaries: [
                  {
                    title: 'Win a Race',
                    desc: win(weekends),
                    icon: <EmojiEventsIcon />
                  },
                  {
                    title: 'Podium Finish',
                    desc: podium(weekends),
                    icon: <CelebrationIcon />
                  },
                  {
                    title: 'Fastest Laps',
                    desc: fastestLaps(weekends),
                    icon: <BoltIcon />
                  },
                  {
                    title: 'Scoring Positions',
                    desc: scoringPositions(weekends),
                    icon: <PlusOneIcon />
                  }
                ]
              },
              {
                title: 'Driver Race Statuses',
                summaries: [
                  {
                    title: 'Finished the Race',
                    desc: finished(weekends),
                    icon: <SportsScoreIcon />
                  },
                  {
                    title: 'Got a Lap',
                    desc: gotALap(weekends),
                    icon: <Timer10SelectIcon />
                  },
                  {
                    title: 'Crashed in Race',
                    desc: crashed(weekends),
                    icon: <ErrorIcon />
                  },
                  {
                    title: 'Mechanical Failures',
                    desc: failures(weekends),
                    icon: <WarningIcon />
                  }
                ]
              },
            ].map(card => <ResultsCard key={card.title} card={card} />)
          }),
          table: new ListingTableModel({
            columns: [
              {
                header: 'Round',
                accessorKey: 'round',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '700', fontSize: '1.2rem' }}
                  />
              },
              {
                header: 'Weekend',
                accessorKey: 'weekend',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={getValue().value}
                    link={`/results/${year}/rounds/${getValue().weekend.round}/race`}
                    style={{ fontWeight: '600' }}
                  />
              },
              {
                header: 'Date',
                accessorKey: 'date',
                enableSorting: false,
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '400', fontSize: '1rem' }}
                  />
              },
              {
                header: 'Circuit Name',
                accessorKey: 'circuit',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <CircuitCell circuit={getValue().circuit} />
              },
              {
                header: 'Grid',
                accessorKey: 'grid',
                enableSorting: true,
                sortingFn: 'grid',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '600', fontSize: '1rem' }}
                  />
              },
              {
                header: 'Fastest Lap',
                accessorKey: 'fl',
                enableSorting: true,
                sortingFn: 'time',
                cell: ({ cell: { getValue }}) =>
                  <FastestLapCell 
                    lap={getValue().fastestLap} 
                    speed={getValue().fastestLap?.getAvgSpeed()}
                  />
              },
              {
                header: 'Completed Laps',
                accessorKey: 'laps',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={`${getValue().value} laps`}
                    link={`/history/laps/${year}/${getValue().weekend.round}/${driver.id}`}
                    style={{ fontWeight: '500', fontSize: '1.1rem' }}
                  />
              },
              {
                header: 'Race Gap',
                accessorKey: 'duration',
                enableSorting: false,
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '400' }}
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
                    style={{ fontWeight: '600', fontSize: '1.2rem' }}
                  />
              },
              {
                header: 'Points',
                accessorKey: 'points',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <PointsCell points={getValue().value} />
              },
            ],
            data: weekends.map((weekend) => ({
              round: { value: +weekend.round },
              weekend: {
                value: weekend.name,
                weekend
              },
              date: { value: weekend.sessions.race.getFormattedDate('MMM. dd.') },
              circuit: {
                value: weekend.circuit.name,
                circuit: weekend.circuit
              },
              grid: { value: weekend.result.race[0].grid },
              fl: {
                value: weekend.result.race[0].fastestLap.time,
                fastestLap: weekend.result.race[0].fastestLap
              },
              laps: {
                value: +weekend.result.race[0].laps,
                weekend
              },
              duration: { value: weekend.result.race[0].raceTime },
              position: { value: +weekend.result.race[0].position },
              points: { value: +weekend.result.race[0].points },
            }))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Helpers
const getDriver = weekends => {
  return weekends[0].result.race[0].driver
}

// Driver Achievements
const win = weekends => {
  return weekends.map(w => 
    w.result.race.filter(r => +r.position === 1)
  ).flat(1).length + ' times in this season'
}

const podium = weekends => {
  return weekends.map(w => 
    w.result.race.filter(r => +r.position <= 3)
  ).flat(1).length + ' times in this season'
}

const fastestLaps = weekends => {
  return weekends[0].result.race[0].fastestLap.time === '-' 
    ? '-' 
    : weekends.map(w => 
        w.result.race.filter(r => +r.fastestLap.rank === 1)
  ).flat(1).length + ' times in this season'
}

const scoringPositions = weekends => {
  return weekends.map(w => 
    w.result.race.filter(r => +r.points > 0)
  ).flat(1).length + ' times in this season'
}


// Driver Race Statuses
const finished = weekends => {
  return weekends.map(w => 
    w.result.race.filter(r => 
        r.status.includes('Finished') || 
        r.status.includes('+'))
  ).flat(1).length + ' times in this season'
}

const gotALap = weekends => {
  return weekends.map(w => 
    w.result.race.filter(r => r.status.includes('+'))
  ).flat(1).length + ' times in this season'
}

const crashed = weekends => {
  return weekends.map(w => (
    w.result.race.filter(r => 
      r.status.includes('Accident') || 
      r.status.includes('Collision'))
  )).flat(1).length + ' times in this season'
}

const failures = weekends => {
  return weekends.map(w => (
    w.result.race.filter(r => 
      !r.status.includes('Finished') || 
      !r.status.includes('+') || 
      !r.status.includes('Accident') || 
      !r.status.includes('Collision'))
  )).flat(1).length + ' times in this season'
}
