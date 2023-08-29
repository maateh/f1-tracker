import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { qualifyingsResults, racesResults } from "../../../../../../api/results"

// components
import ResultsCard from "../../components/card/ResultsCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import CircuitCell from '../../components/table/CircuitCell'
import PoleCell from '../../components/table/PoleCell'
import WinnerCell from '../../components/table/WinnerCell'
import FastestLapCell from '../../components/table/FastestLapCell'

// models
import SeasonModel from "../../../../../../model/season/Season"
import ResultsModel from "../../../../../../model/season/weekend/results/Results"
import QualifyingModel from "../../../../../../model/season/weekend/results/qualifying/Qualifying"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"

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

const useSeasonQuery = () => {
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'results', year], 
    queryFn: () => Promise.all([qualifyingsResults(year), racesResults(year)])
      .then(([{ data: qualifyingsData }, { data: racesData }]) => {
        const { year, weekends } = SeasonModel.parser({ Season: racesData })
  
        if (!weekends) {
          throw new QueryError('No data found!', 404)
        }
  
        const qResults = qualifyingsData.Races.map(race => ResultsModel.parser({ Race: race }))
        if (qResults && qResults.length) {
          weekends.forEach((w, index) => {
            w.results.qualifying = qResults[index]?.qualifying
          })
        }
  
        return new ListingModel({
          title: new ListingTitleModel({
            main: `${year} Season Results`
          }),
          cards: new ListingCardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [
              {
                title: 'Season Information',
                summaries: [
                  { title: 'Drivers', desc: driversAmount(weekends), icon: <SportsMotorsportsIcon /> },
                  { title: 'Constructors', desc: constructorsAmount(weekends), icon: <EngineeringIcon /> },
                  { title: 'Race Weekends', desc: weekendsAmount(weekends, year), icon: <EventIcon /> },
                ]
              },
              {
                title: 'How many different?',
                summaries: [
                  { title: 'Grand Prix Winners', desc: grandPrixWinners(weekends), icon: <EmojiEventsIcon /> },
                  { title: 'Pole Sitters', desc: poleSitters(weekends), icon: <WorkspacePremiumIcon /> },
                  { title: 'Drivers on Podium', desc: driversOnPodium(weekends), icon: <CelebrationIcon /> },
                  { title: 'Point Scorers', desc: pointScorers(weekends), icon: <PlusOneIcon /> },
                ]
              },
              {
                title: 'Drivers Races Status',
                summaries: [
                  { title: 'Finished the Race', desc: finished(weekends), icon: <SportsScoreIcon /> },
                  { title: 'Drivers got a Lap', desc: gotALap(weekends), icon: <Timer10SelectIcon /> },
                  { title: 'Crashed in Race', desc: crashed(weekends), icon: <ErrorIcon /> },
                  { title: 'Mechanical Failures', desc: failures(weekends), icon: <WarningIcon /> }
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
                header: 'Pole Lap',
                accessorKey: 'pole',
                enableSorting: true,
                sortingFn: 'time',
                cell: ({ cell: { getValue }}) => 
                  <PoleCell pole={getValue().pole} />
              },
              {
                header: 'Winner',
                accessorKey: 'winner',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <WinnerCell result={getValue().result} />
              },
              {
                header: 'Fastest Lap',
                accessorKey: 'fl',
                enableSorting: true,
                sortingFn: 'time',
                cell: ({ cell: { getValue }}) => 
                  <FastestLapCell 
                    lap={getValue().result?.fastestLap} 
                    driver={getValue().result?.driver}
                  />
              },
              {
                header: 'Laps',
                accessorKey: 'laps',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={`${getValue().value} laps`}
                    link={`/history/laps/${year}/${getValue().weekend.round}/all`}
                    style={{ fontWeight: '500', fontSize: '1.1rem' }}
                  />
              },
              {
                header: 'Race Duration',
                accessorKey: 'duration',
                enableSorting: true,
                sortingFn: 'time',
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '400' }}
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
              pole: { value: pole(weekend.results).time, pole: pole(weekend.results) },
              winner: {
                value: weekend.results.race[0].driver.fullName,
                result: weekend.results.race[0]
              },
              fl: {
                value: fastest(weekend.results)?.fastestLap.time,
                result: fastest(weekend.results)
              },
              laps: {
                value: +weekend.results.race[0].laps,
                weekend
              },
              duration: { value: weekend.results.race[0].raceTime }
            }))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// General information
const weekendsAmount = (weekends, year) => {
  const suffix = new Date().getFullYear() === year 
    ? ' currently' 
    : ''
  return `${weekends.length} weekends in this season ${suffix}`
}

const driversAmount = weekends => {
  const drivers = weekends.map(w => 
    w.results.race.map(r => r.driver.code)
  ).flat(1)
  return `${new Set(drivers).size} drivers participated`
}

const constructorsAmount = weekends => {
  const constructors = weekends.map(w => 
    w.results.race.map(r => r.constructor.id)
  ).flat(1)
  return `${new Set(constructors).size} constructors participated`
}


// How many different?
const grandPrixWinners = weekends => {
  const winners = weekends.map(w => w.results.race[0].driver.code)
  return `${new Set(winners).size} different drivers`
}

const poleSitters = weekends => {
  const poleSitters = weekends.every(w => w.results.qualifying) 
    ? weekends.map(w => w.results.qualifying[0].driver.code)
    : []
  
  return poleSitters.length 
    ? `${new Set(poleSitters).size} different drivers` 
    : '-'
}

const driversOnPodium = weekends => {
  const driversOnPodium = weekends.map(w => [
    w.results.race[0].driver.code,
    w.results.race[1].driver.code,
    w.results.race[2].driver.code
  ]).flat(1)
  return `${new Set(driversOnPodium).size} different drivers`
}

const pointScorers = weekends => {
  const pointScorers = weekends.map(w => 
    w.results.race
      .filter(r => r.points > 0)
      .map(r => r.driver.code)
  ).flat(1)
  return `${new Set(pointScorers).size} different drivers`
}


// Drivers Races Status
const finished = weekends => {
  return weekends.map(w => 
    w.results.race
      .filter(r => r.status.includes('Finished') || r.status.includes('+'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const gotALap = weekends => {
  return weekends.map(w => 
    w.results.race
      .filter(r => r.status.includes('+'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const crashed = weekends => {
  return weekends.map(w => 
    w.results.race
      .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const failures = weekends => {
  return weekends.map(w => 
    w.results.race
      .filter(r => 
        !r.status.includes('Finished') || 
        !r.status.includes('+') || 
        !r.status.includes('Accident') || 
        !r.status.includes('Collision'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}


// Table info
const pole = results => {
  return results.qualifying 
    ? results.qualifying[0] 
    : new QualifyingModel({})
}

const fastest = results => {
  return results.race
    .find(r => +r.fastestLap?.rank === 1)
}

export default useSeasonQuery
