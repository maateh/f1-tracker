import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { weekendRaceResults } from "../../../../../../api/results/race/weekendRaceResults"

// components
import SummaryCard from "../../../../../../components/listing/cards/card/SummaryCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import FastestLapCell from '../../components/table/FastestLapCell'
import PointsCell from '../../components/table/PointsCell'

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from "../../../../../../model/listing/Title"
import CardsModel from "../../../../../../model/listing/Cards"
import TableModel from "../../../../../../model/listing/Table"

// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Timer10SelectIcon from '@mui/icons-material/Timer10Select'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'

const useWeekendRaceQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setTitle, setCards, setTable } = useListingContext()
  const { year, id: round } = useParams()

  return useQuery({
    queryKey: ['listing', 'weekendRaceResults', year, round],
    queryFn: () => weekendRaceResults(year, round, { limit: 30 })
      .then(({ weekend }) => {        
        setTitle({
          title: new TitleModel({
            main: `${year} ${weekend.name} Race Results`
          })
        })

        setCards({
          cards: new CardsModel({
            styles: CardsModel.FLEX_STYLES,
            layouts: [
              {
                title: 'Weekend Information',
                summaries: [
                  {
                    title: 'Circuit Name',
                    desc: weekend.circuit.name,
                    link: `/profile/circuit/${weekend.circuit.id}`,
                    icon: <LabelIcon />
                  },
                  {
                    title: 'Country, City',
                    desc: `${weekend.circuit.location.country}, ${weekend.circuit.location.locality}`,
                    link: weekend.circuit.getMapsLink(),
                    icon: <PublicIcon />
                  },
                  {
                    title: 'Wikipedia (Circuit)',
                    desc: 'Click here for more!',
                    link: weekend.circuit.wiki,
                    icon: <ContactSupportIcon />
                  },
                  {
                    title: 'Wikipedia (Weekend)',
                    desc: 'Click here for more!',
                    link: weekend.wiki, icon: <ContactSupportIcon />
                  }
                ]
              },
              {
                title: 'Drivers Race Status',
                summaries: [
                  { title: 'Race Finishers', desc: finished(weekend.results), icon: <SportsScoreIcon /> },
                  { title: 'Drivers got a Lap', desc: gotALap(weekend.results), icon: <Timer10SelectIcon /> },
                  { title: 'Crashes in the Race', desc: crashes(weekend.results), icon: <ErrorIcon /> },
                  { title: 'Mechanical Failures', desc: failures(weekend.results), icon: <WarningIcon /> }
                ]
              },
            ].map(card => <SummaryCard key={card.title} card={card} />)
          })
        })

        setTable({
          table: new TableModel({
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
                    value={`${getValue().value} ${getValue().driver.formattedNumber}`}
                    link={`/results/${year}/drivers/${getValue().driver.id}/race`}
                    launchIcon={false}
                    style={{ fontWeight: '500', fontSize: '1.1rem' }}
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
                    launchIcon={false}
                    style={{ fontWeight: '500', fontSize: '1.05rem' }}
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
            data: weekend.results.race.map(result => ({
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
      }),
    onError: err => showBoundary(err)
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
