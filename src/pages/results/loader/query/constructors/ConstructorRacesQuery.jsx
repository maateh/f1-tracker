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

// api
import { constructorRacesResults } from '../../../../../api/results'

// components
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'
import CircuitCell from '../../../components/table/CircuitCell'
import FastestLapCell from '../../../components/table/FastestLapCell'
import PointsCell from '../../../components/table/PointsCell'

// models
import SeasonModel from '../../../../../model/season/Season'
import ListingModel from '../../../../../model/listing/Listing'
import ListingTitleModel from '../../../../../model/listing/ListingTitle'
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from '../../../../../model/listing/ListingTable'
import QueryError from '../../../../../model/error/QueryError'

export const getConstructorRacesQuery = ({ year, id: constructorId }) => ({
  queryKey: ['listing', 'constructorRacesResults', year, constructorId],
  queryFn: () => constructorRacesResults(year, constructorId)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      if (!season.weekends) {
        throw new QueryError('No data found!', 404)
      }

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Race Results`,
          sub: `Selected Constructor | ${getTeam(season).name}`
        }),
        cards: new ListingCardsModel({
          styles: {
            margin: '2rem',
            display: 'flex',
            gap: '1.5rem'
          },
          layouts: [
            {
              title: 'Constructor Information',
              summaries: [
                { title: 'Team Name', desc: getTeam(season).name, link: getTeam(season).wiki, icon: <EngineeringIcon /> },
                { title: 'Nationality', desc: getTeam(season).nationality, icon: <PublicIcon /> },
                { title: 'Drivers', desc: driversQuantity(season), icon: <SportsMotorsportsIcon /> }
              ],
            },
            {
              title: 'Constructor Achievements',
              summaries: [
                { title: 'Win a Race', desc: win(season), icon: <EmojiEventsIcon /> },
                { title: 'Podium Finish', desc: podium(season), icon: <CelebrationIcon /> },
                { title: 'Fastest Lap', desc: fastestLaps(season), icon: <BoltIcon /> },
                { title: 'Scoring Positions', desc: scoringPositions(season), icon: <PlusOneIcon /> }
              ]
            },
            {
              title: 'Constructor Race Statuses',
              summaries: [
                { title: 'Finished the Race', desc: finished(season), icon: <SportsScoreIcon /> },
                { title: 'Got a Lap', desc: gotALap(season), icon: <Timer10SelectIcon /> },
                { title: 'Crashed in Race', desc: crashed(season), icon: <ErrorIcon /> },
                { title: 'Mechanical Failures', desc: failures(season), icon: <WarningIcon /> }
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
              cell: ({ cell: { getValue: getRound }}) => 
                <SingleTableCell
                  data={getRound()}
                  style={{ fontWeight: '700', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Weekend',
              accessorKey: 'weekend',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekendName }}) => 
                <SingleTableCell
                  data={getWeekendName()}
                  style={{ fontWeight: '600' }}
                />
            },
            {
              header: 'Date',
              accessorKey: 'date',
              enableSorting: true,
              cell: ({ cell: { getValue: getDate }}) => 
                <SingleTableCell
                  data={getDate()}
                  style={{ fontWeight: '400', fontSize: '1rem' }}
                />
            },
            {
              header: 'Circuit Name',
              accessorKey: 'circuit',
              enableSorting: true,
              cell: ({ cell: { getValue: getCircuit }}) => 
                <CircuitCell circuit={getCircuit()} />
            },
            {
              header: 'Fastest Lap',
              accessorKey: 'fl',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekend }}) =>
                <FastestLapCell 
                  lap={faster(getWeekend()).fastestLap} 
                  driver={fasterDriver(getWeekend())} 
                />
            },
            {
              header: 'Completed Laps',
              accessorKey: 'laps',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekend }}) => 
                <LinkingTableCell
                  data={`${completedLaps(getWeekend())} laps`}
                  link={`/history/laps/${getWeekend().year}/${getWeekend().round}/all`}
                  style={{ fontWeight: '500', fontSize: '1.1rem' }}
                />
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekend }}) => 
                <PointsCell 
                  points={points(getWeekend())}
                  scorers={scorers(getWeekend())}
                />
            },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend.name,
            date: weekend.sessions.race.getFormattedDate('MMM. dd.'),
            circuit: weekend.circuit,
            fl: weekend,
            laps: weekend,
            points: weekend,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

const getTeam = season => (
  season.weekends[0].result.race[0].constructor
)

// Constructor Information
const driversQuantity = season => {
  const quantity = season.weekends.map(w => (
    w.result.race
      .map(r => r.driver.code)
  )).flat(1)
  return `${new Set(quantity).size} drivers drove for them`
}

// Constructor Achievements
const win = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => +r.position === 1)
  )).flat(1).length + ' times in this season'
)

const podium = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => +r.position <= 3)
  )).flat(1).length + ' times in this season'
)

const fastestLaps = season => (
  season.weekends[0].result.race[0].fastestLap.time === '-' ?
    '-' :
    season.weekends.map(w => (
      w.result.race
        .filter(r => +r.fastestLap.rank === 1)
    )).flat(1).length + ' times in this season'
)

const scoringPositions = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => +r.points > 0)
  )).flat(1).length + ' times in this season'
)


// Constructor Race Statuses
const finished = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('Finished') || r.status.includes('+'))
  )).flat(1).length + ' times in this season'
)

const gotALap = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('+'))
  )).flat(1).length + ' times in this season'
)

const crashed = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
  )).flat(1).length + ' times in this season'
)

const failures = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => 
        !r.status.includes('Finished') || 
        !r.status.includes('+') || 
        !r.status.includes('Accident') || 
        !r.status.includes('Collision')
      )
  )).flat(1).length + ' times in this season'
)


// Table info
const faster = weekend => (
  weekend.result.race
    .sort((acc, curr) => Math.min(acc.fastestLap.rank, curr.fastestLap.rank))[0]
)

const fasterDriver = weekend => {
  const result = faster(weekend)
  return result.fastestLap.time === '-' ? 
    '' : result.driver
}

const completedLaps = weekend => (
  weekend.result.race.length > 1 ?
    weekend.result.race
      .reduce((acc, curr) => +acc.laps || acc + +curr.laps) :
    weekend.result.race[0].laps
)

const points = weekend => (
  weekend.result.race
    .reduce((acc, curr) => +acc.points || acc + +curr.points, 0)
)

const scorers = weekend => (
  weekend.result.race
    .reduce((acc, curr) => `${acc} ${curr.driver.code}: ${curr.points} - `, '')
    .slice(0, -3)
)
