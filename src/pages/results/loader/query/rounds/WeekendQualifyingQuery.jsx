// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

// api
import { qualifyingResults } from "../../../../../api/results"

// components
import ResultsCard from '../../../components/card/ResultsCard'
import CustomTableCell from '../../../../../components/listing/table/cell/CustomTableCell'

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
              title: 'Circuit Information',
              summaries: [
                { title: 'Circuit Name', desc: weekend.circuit.name, icon: <LabelIcon /> },
                { title: 'Country', desc: weekend.circuit.location.country, icon: <PublicIcon /> },
                { title: 'Locality', desc: weekend.circuit.location.locality, icon: <LocationOnIcon /> },
                { title: 'More info', desc: 'link to wiki', icon: <ContactSupportIcon /> },
              ]
            }
          ].map(card => <ResultsCard key={card.title} card={card} />)
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true,
              cell: ({ cell: { getValue: getPosition }}) => 
                <CustomTableCell
                  data={getPosition()}
                  style={{ fontWeight: '600', fontSize: '1.2rem' }}
                />
            },
            {
              header: 'Driver',
              accessorKey: 'driver',
              enableSorting: true,
              cell: ({ cell: { getValue: getDriver }}) => 
                <CustomTableCell
                  data={getDriver()}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Constructor',
              accessorKey: 'constructor',
              enableSorting: true,
              cell: ({ cell: { getValue: getConstructor }}) => 
                <CustomTableCell
                  data={getConstructor()}
                  style={{ fontWeight: '500' }}
                />
            },
            {
              header: 'Q1',
              accessorKey: 'q1',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ1 }}) => 
                <CustomTableCell
                  data={getQ1()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q2',
              accessorKey: 'q2',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ2 }}) => 
                <CustomTableCell
                  data={getQ2()}
                  style={{ fontWeight: '400' }}
                />
            },
            {
              header: 'Q3',
              accessorKey: 'q3',
              enableSorting: true,
              cell: ({ cell: { getValue: getQ3 }}) => 
                <CustomTableCell
                  data={getQ3()}
                  style={{ fontWeight: '400' }}
                />
            },
          ],
          data: weekend.result.qualifying.map(result => ({
            pos: result.position,
            driver: `${result.driver.fullName} ${result.driver.formattedNumber}`,
            constructor: result.constructor.name,
            q1: result.q1,
            q2: result.q2,
            q3: result.q3,
          }))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
})
