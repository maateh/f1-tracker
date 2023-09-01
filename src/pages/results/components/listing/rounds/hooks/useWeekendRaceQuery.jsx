import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { raceResults } from "../../../../../../api/results"

// components
import ResultsCard from "../../components/card/ResultsCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import FastestLapCell from '../../components/table/FastestLapCell'
import PointsCell from '../../components/table/PointsCell'

// models
import WeekendModel from "../../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../../model/listing/ListingCards"
import ListingTableModel from "../../../../../../model/listing/ListingTable"
import QueryError from "../../../../../../model/error/QueryError"

// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

const useWeekendRaceQuery = () => {
  const { year, id: round } = useParams()

  return useQuery({
    queryKey: ['listing', 'raceResults', year, round],
    queryFn: () => raceResults(year, round, { limit: 30 })
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }
        
        const {
          year,
          name,
          circuit,
          wiki,
          results
        } = WeekendModel.parser({ Race: data.Races[0] })
        
        return new ListingModel({
          title: new ListingTitleModel({
            main: `${year} ${name} Race Results`
          }),
          cards: new ListingCardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [
              {
                title: 'Weekend Information',
                summaries: [
                  { title: 'Circuit Name', desc: circuit.name, link: circuit.getMapsLink(), icon: <LabelIcon /> },
                  { title: 'Country, City', desc: `${circuit.location.country}, ${circuit.location.locality}`, icon: <PublicIcon /> },
                  { title: 'Wikipedia (Circuit)', desc: 'Click here for more!', link: circuit.wiki, icon: <ContactSupportIcon /> },
                  { title: 'Wikipedia (Weekend)', desc: 'Click here for more!', link: wiki, icon: <ContactSupportIcon /> },
                ]
              },
              {
                title: 'Drivers Race Status',
                summaries: [
                  { title: 'Race Finishers', desc: finished(results), icon: <SportsScoreIcon /> },
                  { title: 'Drivers got a Lap', desc: gotALap(results), icon: <Timer10SelectIcon /> },
                  { title: 'Crashes in the Race', desc: crashes(results), icon: <ErrorIcon /> },
                  { title: 'Mechanical Failures', desc: failures(results), icon: <WarningIcon /> }
                ]
              },
            ].map(card => <ResultsCard key={card.title} card={card} />)
          }),
          table: new ListingTableModel({
            columns: [
              {
                header: 'Position',
                accessorKey: 'pos',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue } }) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '600', fontSize: '1.2rem' }}
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
                    link={`/results/${year}/drivers/${getValue().driver.id}/race`}
                    style={{ fontWeight: '500' }}
                  />
              },
              {
                header: 'Constructor',
                accessorKey: 'constructor',
                enableSorting: true,
                sortingFn: 'default',
                cell: ({ cell: { getValue }}) => 
                  <LinkingTableCell
                    value={getValue().value}
                    link={`/results/${year}/constructors/${getValue().constructor.id}`}
                    style={{ fontWeight: '500' }}
                  />
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
                header: 'Race gap',
                accessorKey: 'duration',
                enableSorting: false,
                cell: ({ cell: { getValue }}) => 
                  <SingleTableCell
                    value={getValue().value}
                    style={{ fontWeight: '400' }}
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
            data: results.race.map(result => ({
              pos: { value: +result.position },
              driver: {
                value: result.driver.fullName,
                driver: result.driver
              },
              constructor: {
                value: result.constructor.name,
                constructor: result.constructor
              },
              grid: { value: result.grid },
              fl: {
                value: result.fastestLap?.time,
                fastestLap: result.fastestLap
              },
              duration: { value: result.raceTime },
              points: { value: +result.points },
            }))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Drivers Race Status
const finished = results => {
  return results.race.filter(r => 
    r.status.includes('Finished') || 
    r.status.includes('+')
  ).length + ' drivers in this race'
}

const gotALap = results => {
  return results.race
    .filter(r => r.status.includes('+'))
    .length + ' drivers in this race'
}

const crashes = results => {
  return results.race.filter(r => 
    r.status.includes('Accident') || 
    r.status.includes('Collision')
  ).length + ' drivers in this race'
}

const failures = results => {
  return results.race.filter(r => 
    !r.status.includes('Finished') && 
    !r.status.includes('+') && 
    !r.status.includes('Accident') && 
    !r.status.includes('Collision')
  ).length + ' drivers in this race'
}

export default useWeekendRaceQuery
