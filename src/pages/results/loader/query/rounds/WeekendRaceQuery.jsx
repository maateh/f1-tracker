// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { raceResults } from "../../../../../api/results"

// components
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'
import FastestLapCell from '../../../components/table/FastestLapCell'
import PointsCell from '../../../components/table/PointsCell'

// models
import WeekendModel from "../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from "../../../../../model/listing/ListingTable"
import QueryError from "../../../../../model/error/QueryError"

export const getWeekendRaceQuery = ({ year, id: round }) => ({
  queryKey: ['listing', 'raceResults', year, round],
  queryFn: () => raceResults(year, round, { limit: 30 })
    .then(({ data }) => {
      if (!data.Races || !data.Races.length) {
        throw new QueryError('No data found!', 404)
      }
      
      const weekend = new WeekendModel(data.Races[0])
      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Race Results`
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
                { title: 'Circuit Name', desc: weekend.circuit.name, link: weekend.circuit.maps, icon: <LabelIcon /> },
                { title: 'Country, City', desc: `${weekend.circuit.location.country}, ${weekend.circuit.location.locality}`, icon: <PublicIcon /> },
                { title: 'Wikipedia (Circuit)', desc: 'Click here for more!', link: weekend.circuit.wiki, icon: <ContactSupportIcon /> },
                { title: 'Wikipedia (Weekend)', desc: 'Click here for more!', link: weekend.wiki, icon: <ContactSupportIcon /> },
              ]
            },
            {
              title: 'Drivers Race Status',
              summaries: [
                { title: 'Finished the Race', desc: finished(weekend), icon: <SportsScoreIcon /> },
                { title: 'Drivers got a Lap', desc: gotALap(weekend), icon: <Timer10SelectIcon /> },
                { title: 'Crashed in Race', desc: crashed(weekend), icon: <ErrorIcon /> },
                { title: 'Mechanical Failures', desc: failures(weekend), icon: <WarningIcon /> }
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
                  link={`/results/${weekend.year}/drivers/${getValue().driver.id}/race`}
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
                  link={`/results/${weekend.year}/constructors/${getValue().constructor.id}`}
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
                  speed={getValue().fastestLap?.avgSpeed}
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
          data: weekend.result.race.map(result => ({
            pos: { value: +result.position },
            driver: { value: result.driver.fullName, driver: result.driver },
            constructor: { value: result.constructor.name, constructor: result.constructor },
            grid: { value: result.grid },
            fl: { value: result.fastestLap?.time, fastestLap: result.fastestLap },
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

// Drivers Race Status
const finished = weekend => (
  weekend.result.race
    .filter(r => r.status.includes('Finished') || r.status.includes('+'))
    .length + ' drivers in this race'
)

const gotALap = weekend => (
  weekend.result.race
    .filter(r => r.status.includes('+'))
    .length + ' drivers in this race'
)

const crashed = weekend => (
  weekend.result.race
    .filter(r => r.status.includes('Accident') || r.status.includes('Collision'))
    .length + ' drivers in this race'
)

const failures = weekend => (
  weekend.result.race
    .filter(r => 
      !r.status.includes('Finished') || 
      !r.status.includes('+') || 
      !r.status.includes('Accident') || 
      !r.status.includes('Collision')
    )
    .length + ' drivers in this race'
)
