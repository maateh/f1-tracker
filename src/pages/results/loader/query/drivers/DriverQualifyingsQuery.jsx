// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import PublicIcon from '@mui/icons-material/Public'
import CakeIcon from '@mui/icons-material/Cake'
import TagIcon from '@mui/icons-material/Tag'

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

// api
import { driverQualifyingsResults } from "../../../../../api/results"

// components
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'
import CircuitCell from '../../../components/table/CircuitCell'

// models
import SeasonModel from "../../../../../model/season/Season"
import ListingModel from "../../../../../model/listing/Listing"
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from "../../../../../model/listing/ListingTable"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import QueryError from "../../../../../model/error/QueryError"


export const getDriverQualifyingsQuery = ({ year, id: driverId }) => ({
  queryKey: ['listing', 'driverQualifyingsResults', year, driverId],
  queryFn: () => driverQualifyingsResults(year, driverId)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      if (!season.weekends) {
        throw new QueryError('No data found!', 404)
      }

      return new ListingModel({
        title: new ListingTitleModel({
          main: `${season.year} Qualifying Results`,
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
                { title: 'Pole Positions', desc: poles(season), icon: <WorkspacePremiumIcon /> },
                { title: 'Qualify to the Front Row', desc: frontRows(season), icon: <UnfoldLessDoubleIcon /> },
                { title: 'Reached Q3', desc: reachedQ3(season), icon: <StarHalfIcon /> },
                { title: 'Eliminated in Q1', desc: eliminated(season), icon: <ThumbDownOffAltIcon /> }
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
              header: 'Q1',
              accessorKey: 'q1',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ1 }}) => 
                <SingleTableCell
                  data={getQ1()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q2',
              accessorKey: 'q2',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ2 }}) => 
                <SingleTableCell
                  data={getQ2()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q3',
              accessorKey: 'q3',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ3 }}) => 
                <SingleTableCell
                  data={getQ3()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true,
              cell: ({ cell: { getValue: getPosition }}) => 
                <SingleTableCell
                  data={getPosition()}
                  style={{ fontWeight: '600', fontSize: '1.2rem' }}
                />
            },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend,
            date: weekend.sessions.race.getFormattedDate('MMM. dd.'),
            circuit: weekend.circuit,
            q1: weekend.result.qualifying[0].q1,
            q2: weekend.result.qualifying[0].q2,
            q3: weekend.result.qualifying[0].q3,
            pos: weekend.result.qualifying[0].position,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})

const getDriver = season => (
  season.weekends[0].result.qualifying[0].driver
)

const poles = season => (
  season.weekends.map(w => (
    w.result.qualifying
      .filter(r => +r.position === 1)
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)

const frontRows = season => (
  season.weekends.map(w => (
    w.result.qualifying
      .filter(r => +r.position <= 2)
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)

const reachedQ3 = season => (
  season.weekends.map(w => (
    w.result.qualifying
      .filter(r => !r.q3.includes('-'))
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)

const eliminated = season => (
  season.weekends.map(w => (
    w.result.qualifying
      .filter(r => r.q2.includes('-'))
      .map(r => r.driver.code)
  )).flat(1).length + ' times in this season'
)
