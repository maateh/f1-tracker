// icons
import EventIcon from '@mui/icons-material/Event'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import EngineeringIcon from '@mui/icons-material/Engineering'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import CelebrationIcon from '@mui/icons-material/Celebration'
import PlusOneIcon from '@mui/icons-material/PlusOne'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { qualifyingsResults, racesResults } from '../../../../../api/results'

// components
import ResultsCard from '../../../content/card/ResultsCard'

// models
import SeasonModel from '../../../../../model/season/Season'
import ResultModel from '../../../../../model/season/weekend/result/Result'
import ListingModel from '../../../../../model/listing/Listing'
import ListingTitleModel from '../../../../../model/listing/ListingTitle'
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from '../../../../../model/listing/ListingTable'
import QualifyingModel from '../../../../../model/season/weekend/result/qualifying/Qualifying'
import QueryError from '../../../../../model/error/QueryError'

export const getSeasonQuery = ({ year }) => ({
  queryKey: ['listing', 'results', year], 
  queryFn: () => Promise.all([qualifyingsResults(year), racesResults(year)])
    .then(([{ data: qualifyingsData }, { data: racesData }]) => {
      const season = new SeasonModel(racesData)

      if (!season.weekends) {
        throw new QueryError('No data found!', 404)
      }

      const qResults = qualifyingsData.Races.map(w => new ResultModel(w))
      if (qResults && qResults.length) {
        season.weekends.forEach((w, index) => w.result.qualifying = qResults[index].qualifying)
      }

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Season Results`
        }),
        cards: new ListingCardsModel({
          styles: {
            margin: '2rem',
            display: 'flex',
            gap: '1.5rem'
          },
          layouts: [
            {
              title: 'General Information',
              summaries: [
                { title: 'Drivers', desc: driversAmount(season), icon: <SportsMotorsportsIcon /> },
                { title: 'Constructors', desc: constructorsAmount(season), icon: <EngineeringIcon /> },
                { title: 'Race Weekends', desc: weekendsAmount(season), icon: <EventIcon /> },
              ]
            },
            {
              title: 'How many different?',
              summaries: [
                { title: 'Grand Prix Winners', desc: grandPrixWinners(season), icon: <EmojiEventsIcon /> },
                { title: 'Pole Sitters', desc: poleSitters(season), icon: <WorkspacePremiumIcon /> },
                { title: 'Drivers on Podium', desc: driversOnPodium(season), icon: <CelebrationIcon /> },
                { title: 'Point Scorers', desc: pointScorers(season), icon: <PlusOneIcon /> },
              ]
            },
            {
              title: 'Drivers Races Status',
              summaries: [
                { title: 'Finished the Race', desc: finished(season), icon: <SportsScoreIcon /> },
                { title: 'Drivers got a Lap', desc: gotALap(season), icon: <Timer10SelectIcon /> },
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
            //   header: 'Pole Lap',
            //   accessorKey: 'pole',
            //   enableSorting: true
            // },
            // {
            //   header: 'Winner',
            //   accessorKey: 'winner',
            //   enableSorting: true
            // },
            // {
            //   header: 'Fastest Lap',
            //   accessorKey: 'fl',
            //   enableSorting: true
            // },
            {
              header: 'Laps',
              accessorKey: 'laps',
              enableSorting: true
            },
            {
              header: 'Race Duration',
              accessorKey: 'duration',
              enableSorting: true
            },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend.name,
            date: weekend.sessions.race.getFormattedDate('MMM. dd.'),
            circuit: weekend.circuit.name,
            // pole: [
            //   { key: 'pole-time', data: pole(w)?.time },
            //   { key: 'pole-driver', data: pole(w)?.driver?.code },
            // ],
            // winner: [
            //   { key: 'winner-driver', data: weekend.result.race[0].driver.fullName },
            //   { key: 'winner-constructor', data: weekend.result.race[0].constructor.name }
            // ],
            // fl: [
            //   { key: 'fl-time', data: fastest(w) ? fastest(w).fastestLap.time : '-' },
            //   { key: 'fl-driver', data: fastest(w) ? fastest(w).driver.code : '' }
            // ],
            laps: weekend.result.race[0].laps,
            duration: weekend.result.race[0].raceTime
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

// General information
const weekendsAmount = season => {
  const year = new Date().getFullYear()
  return `${season.weekends.length} weekends in this season ${year === +season.year ? ' currently' : ''}`
}

const driversAmount = season => {
  const drivers = season.weekends.map(w => (
    w.result.race.map(r => r.driver.code)
  )).flat(1)
  return `${new Set(drivers).size} drivers participated`
}

const constructorsAmount = season => {
  const constructors = season.weekends.map(w => (
    w.result.race.map(r => r.constructor.id)
  )).flat(1)
  return `${new Set(constructors).size} constructors participated`
}


// How many different?
const grandPrixWinners = season => {
  const winners = season.weekends.map(w => w.result.race[0].driver.code)
  return `${new Set(winners).size} different drivers`
}

const poleSitters = season => {
  const poleSitters = season.weekends.find(w => w.result.qualifying) ? 
    season.weekends.map(w => w.result.qualifying[0].driver.code) :
    []
  return poleSitters.length ? `${new Set(poleSitters).size} different drivers` : '-'
}

const driversOnPodium = season => {
  const driversOnPodium = season.weekends.map(w => ([
    w.result.race[0].driver.code,
    w.result.race[1].driver.code,
    w.result.race[2].driver.code
  ])).flat(1)
  return `${new Set(driversOnPodium).size} different drivers`
}

const pointScorers = season => {
  const pointScorers = season.weekends.map(w => (
    w.result.race
      .filter(r => r.points > 0)
      .map(r => r.driver.code)
  )).flat(1)
  return `${new Set(pointScorers).size} different drivers`
}


// Drivers Races Status
const finished = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('Finished') || r.status.includes('+'))
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)

const gotALap = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('+'))
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)

const crashed = season => (
  season.weekends.map(w => (
    w.result.race
      .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
      .map(r => r.driver.code)
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
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)


// Table info
const pole = weekend => (
  weekend.result.qualifying ? 
    weekend.result.qualifying[0] : 
    new QualifyingModel()
)

const fastest = weekend => (
  weekend.result.race
    .find(r => +r.fastestLap?.rank === 1)
)
