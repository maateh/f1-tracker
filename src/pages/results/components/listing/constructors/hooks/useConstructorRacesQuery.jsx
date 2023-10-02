import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorRacesResultsFromSeason } from "../../../../../../api/results/race/constructorRacesResults"

// components
import SummaryCard from "../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import CircuitCell from "../../components/table/CircuitCell"
import FastestLapCell from "../../components/table/FastestLapCell"
import PointsCell from "../../components/table/PointsCell"

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from '../../../../../../model/listing/Title'
import CardsModel from '../../../../../../model/listing/Cards'
import TableModel from '../../../../../../model/listing/Table'

// icons
import EngineeringIcon from '@mui/icons-material/Engineering'
import PublicIcon from '@mui/icons-material/Public'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CelebrationIcon from '@mui/icons-material/Celebration'
import BoltIcon from '@mui/icons-material/Bolt'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

const useConstructorRacesQuery = () => {
  const { setTitle, setCards, setTable } = useListingContext()
  const { year, id: constructorId } = useParams()

  return useQuery({
    queryKey: ['listing', 'constructorRacesResultsFromSeason', year, constructorId],
    queryFn: () => constructorRacesResultsFromSeason(year, constructorId)
      .then(({ weekends }) => {
        const team = getTeam(weekends)
  
        setTitle({
          title: new TitleModel({
            main: `${year} Race Results`,
            sub: `Selected Constructor | ${team.name}`
          })
        })

        setCards({
          cards: new CardsModel({
            styles: CardsModel.FLEX_STYLES,
            layouts: [
              {
                title: 'Constructor Information',
                summaries: [
                  {
                    title: 'Team Name',
                    desc: team.name,
                    link: `/profile/constructor/${team.id}`,
                    icon: <EngineeringIcon />
                  },
                  {
                    title: 'Nationality',
                    desc: team.nationality,
                    icon: <PublicIcon />
                  },
                  {
                    title: 'Drivers',
                    desc: driversQuantity(weekends),
                    icon: <SportsMotorsportsIcon />
                  }
                ],
              },
              {
                title: 'Constructor Achievements',
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
                    title: 'Fastest Lap',
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
                title: 'Constructor Race Statuses',
                summaries: [
                  {
                    title: 'Finished Races',
                    desc: finished(weekends),
                    icon: <SportsScoreIcon />
                  },
                  {
                    title: 'Got a Lap',
                    desc: gotALap(weekends),
                    icon: <Timer10SelectIcon />
                  },
                  {
                    title: 'Crashed in Races',
                    desc: crashes(weekends),
                    icon: <ErrorIcon />
                  },
                  {
                    title: 'Mechanical Failures',
                    desc: failures(weekends),
                    icon: <WarningIcon />
                  }
                ]
              },
            ].map(card => <SummaryCard key={card.title} card={card} />)
          })
        })

        setTable({
          table: new TableModel({
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
                    link={`/results/${getValue().weekend.year}/rounds/${getValue().weekend.round}/race`}
                    launchIcon={false}
                    style={{ fontWeight: '600', fontSize: '1.1rem' }}
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
                header: 'Fastest Lap',
                accessorKey: 'fl',
                enableSorting: true,
                sortingFn: 'time',
                cell: ({ cell: { getValue }}) =>
                  <FastestLapCell 
                    lap={getValue().lap} 
                    driver={getValue().driver} 
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
                    link={`/history/laps/${getValue().weekend.year}/${getValue().weekend.round}/all`}
                    launchIcon={true}
                    style={{ fontWeight: '500', fontSize: '1.1rem' }}
                  />
              },
              {
                header: 'Points',
                accessorKey: 'points',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <PointsCell 
                    points={getValue().value}
                    scorers={getValue().scorers}
                  />
              },
            ],
            data: weekends.map(weekend => ({
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
              fl: {
                value: faster(weekend.results).fastestLap.time,
                lap: faster(weekend.results).fastestLap,
                driver: fasterDriver(weekend.results)
              },
              laps: {
                value: completedLaps(weekend.results),
                weekend
              },
              points: {
                value: points(weekend.results),
                scorers: scorers(weekend.results)
              },
            }))
          })
        })
      })
  })
}

// Helpers
const getTeam = weekends => {
  return weekends[0].results.race[0].constructor
}

// Cards - Constructor Information
const driversQuantity = weekends => {
  const quantity = weekends.map(w => 
    w.results.race.map(r => r.driver.code)
  ).flat(1)
  return `${new Set(quantity).size} drivers drove for them`
}

// Cards - Constructor Achievements
const win = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => +r.position === 1)
  ).flat(1).length + ' times in this season'
}

const podium = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => +r.position <= 3)
  ).flat(1).length + ' times in this season'
}

const fastestLaps = weekends => {
  return weekends[0].results.race[0].fastestLap.time === '-' 
    ? '-'
    : weekends.map(w => 
        w.results.race.filter(r => +r.fastestLap.rank === 1)
  ).flat(1).length + ' times in this season'
}

const scoringPositions = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => +r.points > 0)
  ).flat(1).length + ' times in this season'
}

// Cards - Constructor Race Statuses
const finished = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => 
      r.status.includes('Finished') || 
      r.status.includes('+'))
  ).flat(1).length + ' times in this season'
}

const gotALap = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => r.status.includes('+'))
  ).flat(1).length + ' times in this season'
}

const crashes = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => 
      r.status.includes('Accident') || 
      r.status.includes('Collision'))
  ).flat(1).length + ' times in this season'
}

const failures = weekends => {
  return weekends.map(w => 
    w.results.race.filter(r => 
      !r.status.includes('Finished') && 
      !r.status.includes('+') && 
      !r.status.includes('Accident') && 
      !r.status.includes('Collision'))
  ).flat(1).length + ' times in this season'
}

// Table helpers
const faster = results => {
  return results.race
    .sort((acc, curr) => 
      Math.min(acc.fastestLap.rank, curr.fastestLap.rank))[0]
}

const fasterDriver = results => {
  const result = faster(results)
  return result.fastestLap.time === '-' 
    ? '' 
    : result.driver
}

const completedLaps = results => {
  return results.race.length > 1 
    ? +results.race
        .reduce((acc, curr) => +acc.laps + +curr.laps) 
    : +results.race[0].laps
}

const points = results => {
  return +results.race
    .reduce((acc, curr) => +acc.points || acc + +curr.points, 0)
}

const scorers = results => {
  return results.race
    .reduce((acc, curr) => 
      `${acc} ${curr.driver.code}: ${curr.points} - `, '')
    .slice(0, -3)
}

export default useConstructorRacesQuery
