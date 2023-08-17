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

// api
import { driverRacesResults } from '../../../../../api/results'

// models
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'
import CircuitCell from '../../../components/table/CircuitCell'
import FastestLapCell from '../../../components/table/FastestLapCell'

// models
import SeasonModel from '../../../../../model/season/Season'
import ListingModel from "../../../../../model/listing/Listing"
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from "../../../../../model/listing/ListingTable"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import QueryError from '../../../../../model/error/QueryError'
import PointsCell from '../../../components/table/PointsCell'

export const getDriverRacesQuery = ({ year, id: driverId }) => ({
  queryKey: ['listing', 'driverRacesResults', year, driverId],
  queryFn: () => driverRacesResults(year, driverId)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      if (!season.weekends) {
        throw new QueryError('No data found!', 404)
      }

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Race Results`,
          sub: `Selected Driver | ${getDriver(season).fullName} ${getDriver(season).formattedNumber}`
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
                { title: 'Full Name', desc: getDriver(season).fullName, icon: <SportsMotorsportsIcon /> },
                { title: 'Nationality', desc: getDriver(season).nationality, icon: <PublicIcon /> },
                { title: 'Date of Birth', desc: getDriver(season).dateOfBirth, icon: <CakeIcon /> },
                { title: 'Driver code, number', desc: `${getDriver(season).code} ${getDriver(season).formattedNumber}`, icon: <TagIcon /> },
              ]
            },
            {
              title: 'Driver Achievements',
              summaries: [
                { title: 'Win a Race', desc: win(season), icon: <EmojiEventsIcon /> },
                { title: 'Podium Finish', desc: podium(season), icon: <CelebrationIcon /> },
                { title: 'Fastest Laps', desc: fastestLaps(season), icon: <BoltIcon /> },
                { title: 'Scoring Positions', desc: scoringPositions(season), icon: <PlusOneIcon /> }
              ]
            },
            {
              title: 'Driver Race Statuses',
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
              cell: ({ cell: { getValue: getWeekend }}) => 
                <LinkingTableCell
                  data={getWeekend().name}
                  link={getWeekend().wiki}
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
              header: 'Grid',
              accessorKey: 'grid',
              enableSorting: true
            },
            {
              header: 'Fastest Lap',
              accessorKey: 'fl',
              enableSorting: true,
              cell: ({ cell: { getValue: getFastestLap }}) =>
                <FastestLapCell 
                  lap={getFastestLap()} 
                  speed={getFastestLap()?.avgSpeed}
                />
            },
            {
              header: 'Completed Laps',
              accessorKey: 'laps',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekend }}) => 
                <LinkingTableCell
                  data={`${getWeekend().result.race[0].laps} laps`}
                  link={`/history/laps/${getWeekend().year}/${getWeekend().round}/${getWeekend().result.race[0].driver.id}`}
                  style={{ fontWeight: '500', fontSize: '1.1rem' }}
                />
            },
            {
              header: 'Race Gap',
              accessorKey: 'duration',
              enableSorting: true,
              cell: ({ cell: { getValue: getDuration }}) => 
                <SingleTableCell
                  data={getDuration()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Position',
              accessorKey: 'position',
              enableSorting: true,
              cell: ({ cell: { getValue: getPosition }}) => 
                <SingleTableCell
                  data={getPosition()}
                  style={{ fontWeight: '600', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true,
              cell: ({ cell: { getValue: getPoints }}) => 
                <PointsCell points={getPoints()} />
            },
          ],
          data: season.weekends.map((weekend) => ({
            round: weekend.round,
            weekend: weekend,
            date: weekend.sessions.race.getFormattedDate('MMM. dd.'),
            circuit: weekend.circuit,
            grid: weekend.result.race[0].grid,
            fl: weekend.result.race[0].fastestLap,
            laps: weekend,
            duration: weekend.result.race[0].raceTime,
            position: weekend.result.race[0].position,
            points: weekend.result.race[0].points,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

const getDriver = season => (
  season.weekends[0].result.race[0].driver
)

// Driver Achievements
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


// Driver Race Statuses
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
