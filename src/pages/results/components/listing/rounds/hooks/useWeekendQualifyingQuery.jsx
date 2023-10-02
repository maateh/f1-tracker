import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// api
import { weekendQualifyingResults } from '../../../../../../api/results/qualifying/weekendQualifyingResults'

// components
import SummaryCard from '../../../../../../components/listing/cards/card/SummaryCard'
import SingleTableCell from '../../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../../components/listing/table/cell/LinkingTableCell'

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

const useWeekendQualifyingQuery = () => {
  const { setTitle, setCards, setTable } = useListingContext()
  const { year, id: round } = useParams()

  return useQuery({
    queryKey: ['listing', 'weekendQualifyingResults', year, round],
    queryFn: () => weekendQualifyingResults(year, round)
      .then(({ weekend }) => {  
        setTitle({
          title: new TitleModel({
            main: `${year} ${weekend.name} Qualifying Results`
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
              }
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
            data: weekend.results.qualifying.map(result => ({
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
  })
}

export default useWeekendQualifyingQuery
