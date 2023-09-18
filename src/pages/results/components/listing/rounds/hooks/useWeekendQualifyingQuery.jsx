import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// api
import { qualifyingResults } from '../../../../../../api/results/qualifying/qualifyingResults'

// components
import ResultsCard from '../../components/card/ResultsCard'
import SingleTableCell from '../../../../../../components/listing/table/cell/SingleTableCell'
import LinkingTableCell from '../../../../../../components/listing/table/cell/LinkingTableCell'

// context
import useListingContext from "../../../../../../components/listing/context/hooks/useListingContext"

// models
import WeekendModel from '../../../../../../model/season/weekend/Weekend'
import TitleModel from "../../../../../../model/listing/Title"
import CardsModel from "../../../../../../model/listing/Cards"
import TableModel from "../../../../../../model/listing/Table"
import QueryError from "../../../../../../model/error/QueryError"

// icons
import LabelIcon from '@mui/icons-material/Label'
import PublicIcon from '@mui/icons-material/Public'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

const useWeekendQualifyingQuery = () => {
  const { setTitle, setCards, setTable } = useListingContext()
  const { year, id: round } = useParams()

  return useQuery({
    queryKey: ['listing', 'qualifyingResults', year, round],
    queryFn: () => qualifyingResults(year, round)
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

        setTitle({
          title: new TitleModel({
            main: `${year} ${name} Qualifying Results`
          })
        })

        setCards({
          cards: new CardsModel({
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
            ].map(card => <ResultsCard key={card.title} card={card} />)
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
            data: results.qualifying.map(result => ({
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
}

export default useWeekendQualifyingQuery
