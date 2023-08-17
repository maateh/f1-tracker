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
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'
import CircuitCell from '../../../components/table/CircuitCell'
import PoleCell from '../../../components/table/PoleCell'
import WinnerCell from '../../../components/table/WinnerCell'
import FastestLapCell from '../../../components/table/FastestLapCell'

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
        season.weekends.forEach((w, index) => {
          w.result.qualifying = qResults[index]?.qualifying
        })
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
              header: 'Pole Lap',
              accessorKey: 'pole',
              enableSorting: true,
              cell: ({ cell: { getValue: getPole }}) => 
                <PoleCell pole={getPole()} />
            },
            {
              header: 'Winner',
              accessorKey: 'winner',
              enableSorting: true,
              cell: ({ cell: { getValue: getResult }}) => 
                <WinnerCell result={getResult()} />
            },
            {
              header: 'Fastest Lap',
              accessorKey: 'fl',
              enableSorting: true,
              cell: ({ cell: { getValue: getResult }}) => 
                <FastestLapCell 
                  lap={getResult()?.fastestLap} 
                  driver={getResult()?.driver}
                />
            },
            {
              header: 'Laps',
              accessorKey: 'laps',
              enableSorting: true,
              cell: ({ cell: { getValue: getWeekend }}) => 
                <LinkingTableCell
                  data={`${getWeekend().result.race[0].laps} laps`}
                  link={`/history/laps/${getWeekend().year}/${getWeekend().round}/all`}
                  style={{ fontWeight: '500', fontSize: '1.1rem' }}
                />
            },
            {
              header: 'Race Duration',
              accessorKey: 'duration',
              enableSorting: true,
              cell: ({ cell: { getValue: getDuration }}) => 
                <SingleTableCell
                  data={getDuration()}
                  style={{ fontWeight: '400' }}
                />
            },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend,
            date: weekend.sessions.race.getFormattedDate('MMM. dd.'),
            circuit: weekend.circuit,
            pole: pole(weekend),
            winner: weekend.result.race[0],
            fl: fastest(weekend),
            laps: weekend,
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
  const poleSitters = season.weekends.every(w => w.result.qualifying) ? 
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
