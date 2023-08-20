// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

// api
import { qualifyingResults } from "../../../../../api/results"

// components
import ResultsCard from '../../../components/card/ResultsCard'
import SingleTableCell from '../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../components/listing/table/cell/LinkingTableCell'

// models
import WeekendModel from "../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import ListingCardsModel from '../../../../../model/listing/ListingCards'
import ListingTableModel from "../../../../../model/listing/ListingTable"
import QueryError from "../../../../../model/error/QueryError"

export const getWeekendQualifyingQuery = ({ year, id: round }) => ({
  queryKey: ['listing', 'qualifyingResults', year, round],
  queryFn: () => qualifyingResults(year, round)
    .then(({ data }) => {
      if (!data.Races || !data.Races.length) {
        throw new QueryError('No data found!', 404)
      }

      const weekend = new WeekendModel(data.Races[0])
      return new ListingModel({
        title: new ListingTitleModel({
          main: `${weekend.year} ${weekend.name} Qualifying Results`
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
          ].map(card => <ResultsCard key={card.title} card={card} />)
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true,
              sortingFn: 'default',
              cell: ({ cell: { getValue }}) => 
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
              header: 'Q1',
              accessorKey: 'q1',
              enableSorting: true,
              sortingFn: 'time',
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q2',
              accessorKey: 'q2',
              enableSorting: true,
              sortingFn: 'time',
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q3',
              accessorKey: 'q3',
              enableSorting: true,
              sortingFn: 'time',
              cell: ({ cell: { getValue }}) => 
                <SingleTableCell
                  value={getValue().value}
                  style={{ fontWeight: '400' }}
                />
            },
          ],
          data: weekend.result.qualifying.map(result => ({
            pos: { value: +result.position },
            driver: { value: result.driver.fullName, driver: result.driver },
            constructor: { value: result.constructor.name, constructor: result.constructor },
            q1: { value: result.q1 },
            q2: { value: result.q2 },
            q3: { value: result.q3 },
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
