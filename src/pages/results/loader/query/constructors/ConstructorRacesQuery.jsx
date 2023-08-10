// icons
import EngineeringIcon from '@mui/icons-material/Engineering'
import PublicIcon from '@mui/icons-material/Public'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

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

// models
import SeasonModel from '../../../../../model/season/Season'
import ListingModel from '../../../../../model/listing/Listing'
import ListingTitleModel from '../../../../../model/listing/ListingTitle'
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
          main: `${season.year} Race Results - ${getTeam(season).name}`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Round',
              accessorKey: 'round',
              enableSorting: true
            },
            {
              header: 'Weekend',
              accessorKey: 'weekend',
              enableSorting: true
            },
            {
              header: 'Date',
              accessorKey: 'date',
              enableSorting: true
            },
            {
              header: 'Circuit Name',
              accessorKey: 'circuit',
              enableSorting: true
            },
            // {
            //   header: 'Fastest Lap',
            //   accessorKey: 'fl',
            //   enableSorting: true
            // },
            {
              header: 'Completed Laps',
              accessorKey: 'laps',
              enableSorting: true
            },
            // {
            //   header: 'Points',
            //   accessorKey: 'points',
            //   enableSorting: true
            // },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend.name,
            date: weekend.getFormattedDate('MMM dd.'),
            circuit: weekend.circuit.name,
            // fl: [
            //   { key: 'fl-time', data: faster(weekend).fastestLap.time },
            //   { key: 'fl-driver', data: fasterDriver(weekend) },
            // ],
            laps: `${completedLaps(weekend)} laps`,
            // points: [
            //   { key: 'points-amount', data: `${points(weekend)} points` },
            //   { key: 'points-drivers', data: scorers(weekend) },
            // ],
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

const fasterDriver = weekend => (
  faster(weekend).fastestLap.time === '-' ? 
    '' : faster.driver.code
)

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

// this.info = [
//   {
//     category: 'Constructor Information',
//     data: [
//       { title: 'Team Name', desc: this.team.name, icon: <EngineeringIcon /> },
//       { title: 'Nationality', desc: this.team.nationality, icon: <PublicIcon /> },
//       { title: 'Drivers', desc: this.driversQuantity(), icon: <SportsMotorsportsIcon /> },
//       { title: 'More info', desc: 'link to wiki', icon: <ContactSupportIcon /> },
//     ],
//   },
//   {
//     category: 'Constructor Achievements',
//     data: [
//       { title: 'Win a Race', desc: this.win(), icon: <EmojiEventsIcon /> },
//       { title: 'Podium Finish', desc: this.podium(), icon: <CelebrationIcon /> },
//       { title: 'Fastest Lap', desc: this.fastestLaps(), icon: <BoltIcon /> },
//       { title: 'Scoring Positions', desc: this.scoringPositions(), icon: <PlusOneIcon /> }
//     ]
//   },
//   {
//     category: 'Constructor Race Statuses',
//     data: [
//       { title: 'Finished the Race', desc: this.finished(), icon: <SportsScoreIcon /> },
//       { title: 'Got a Lap', desc: this.gotALap(), icon: <Timer10SelectIcon /> },
//       { title: 'Crashed in Race', desc: this.crashed(), icon: <ErrorIcon /> },
//       { title: 'Mechanical Failures', desc: this.failures(), icon: <WarningIcon /> }
//     ]
//   },
// ]
