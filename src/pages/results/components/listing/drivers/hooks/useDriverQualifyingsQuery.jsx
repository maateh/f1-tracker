import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverQualifyingsResults } from "../../../../../../api/results/qualifying/driverQualifyingsResults"

// components
import ResultsCard from "../../components/card/ResultsCard"
import SingleTableCell from "../../../../../../components/listing/table/cell/SingleTableCell"
import LinkingTableCell from "../../../../../../components/listing/table/cell/LinkingTableCell"
import CircuitCell from "../../components/table/CircuitCell"

// models
import SeasonModel from "../../../../../../model/season/Season"
import ListingModel from "../../../../../../model/listing/Listing"
import TitleModel from "../../../../../../model/listing/Title"
import CardsModel from "../../../../../../model/listing/Cards"
import TableModel from "../../../../../../model/listing/Table"
import QueryError from "../../../../../../model/error/QueryError"

// icons
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import PublicIcon from '@mui/icons-material/Public'
import CakeIcon from '@mui/icons-material/Cake'
import TagIcon from '@mui/icons-material/Tag'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

const useDriverQualifyingsQuery = () => {
  const { year, id: driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'driverQualifyingsResults', year, driverId],
    queryFn: () => driverQualifyingsResults(year, driverId)
      .then(({ data }) => {
        const { year, weekends } = SeasonModel.parser({ Season: data })
  
        if (!weekends) {
          throw new QueryError('No data found!', 404)
        }

        const driver = getDriver(weekends)
  
        return new ListingModel({
          title: new TitleModel({
            main: `${year} Qualifying Results`,
            sub: `Selected Driver | ${driver.fullName} ${driver.formattedNumber}`
          }),
          cards: new CardsModel({
            styles: {
              margin: '2rem',
              display: 'flex',
              gap: '1.5rem'
            },
            layouts: [
              {
                title: 'Driver Information',
                summaries: [
                  {
                    title: 'Full Name',
                    desc: driver.fullName,
                    link: driver.wiki,
                    icon: <SportsMotorsportsIcon />
                  },
                  {
                    title: 'Nationality',
                    desc: driver.nationality,
                    icon: <PublicIcon />
                  },
                  {
                    title: 'Date of Birth',
                    desc: driver.formattedDateOfBirth,
                    icon: <CakeIcon />
                  },
                  {
                    title: 'Driver code, number',
                    desc: `${driver.code} ${driver.formattedNumber}`,
                    icon: <TagIcon />
                  },
                ]
              },
              {
                title: 'Driver Achievements',
                summaries: [
                  {
                    title: 'Pole Positions',
                    desc: poles(weekends),
                    icon: <WorkspacePremiumIcon />
                  },
                  {
                    title: 'Qualify to the Front Row',
                    desc: frontRows(weekends),
                    icon: <UnfoldLessDoubleIcon />
                  },
                  {
                    title: 'Reached Q3',
                    desc: reachedQ3(weekends),
                    icon: <StarHalfIcon />
                  },
                  {
                    title: 'Eliminated in Q1',
                    desc: eliminated(weekends),
                    icon: <ThumbDownOffAltIcon />
                  }
                ]
              },
            ].map(card => <ResultsCard key={card.title} card={card} />)
          }),
          table: new TableModel({
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
                    link={`/results/${getValue().weekend.year}/rounds/${getValue().weekend.round}/race`}
                    style={{ fontWeight: '600' }}
                  />
              },
              {
                header: 'Date',
                accessorKey: 'date',
                enableSorting: false,
                sortingFn: 'default',
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
              q1: { value: weekend.results.qualifying[0].q1 },
              q2: { value: weekend.results.qualifying[0].q2 },
              q3: { value: weekend.results.qualifying[0].q3 },
              pos: { value: +weekend.results.qualifying[0].position },
            }))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

// Helpers
const getDriver = weekends => {
  return weekends[0].results.qualifying[0].driver
}

const poles = weekends => {
  return weekends.map(w => 
    w.results.qualifying
      .filter(r => +r.position === 1)
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const frontRows = weekends => {
  return weekends.map(w => 
    w.results.qualifying
      .filter(r => +r.position <= 2)
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const reachedQ3 = weekends => {
  return weekends.map(w => 
    w.results.qualifying
      .filter(r => !r.q3.includes('-'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

const eliminated = weekends => {
  return weekends.map(w => 
    w.results.qualifying
      .filter(r => r.q2.includes('-'))
      .map(r => r.driver.code)
  ).flat(1).length + ' times in this season'
}

export default useDriverQualifyingsQuery
