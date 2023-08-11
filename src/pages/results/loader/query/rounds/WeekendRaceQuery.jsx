// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

// api
import { raceResults } from "../../../../../api/results"

// components
import ResultsCard from '../../../content/card/ResultsCard'

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
              title: 'Circuit Information',
              summaries: [
                { title: 'Circuit Name', desc: weekend.circuit.name, icon: <LabelIcon /> },
                { title: 'Country', desc: weekend.circuit.location.country, icon: <PublicIcon /> },
                { title: 'Locality', desc: weekend.circuit.location.locality, icon: <LocationOnIcon /> },
                { title: 'More info', desc: 'link to wiki', icon: <ContactSupportIcon /> },
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
              enableSorting: true
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true
            },
            {
              header: 'Constructor',
              accessorKey: 'constructor',
              enableSorting: true
            },
            {
              header: 'Grid',
              accessorKey: 'grid',
              enableSorting: true
            },
            // {
            //   header: 'Fastest Lap',
            //   accessorKey: 'fl',
            //   enableSorting: true
            // },
            {
              header: 'Race gap',
              accessorKey: 'duration',
              enableSorting: true
            },
            {
              header: 'Points',
              accessorKey: 'points',
              enableSorting: true
            },
          ],
          data: weekend.result.race.map(result => ({
            pos: result.position,
            driver: `${result.driver.fullName} ${result.driver.formattedNumber}`,
            constructor: result.constructor.name,
            grid: result.grid,
            // fl: [
            //   { key: 'fl-time', data: result.fastestLap.time },
            //   { key: 'fl-speed', data: result.fastestLap?.avgSpeed },
            // ],
            duration: result.raceTime,
            points: result.points,
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
