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

// models
import SeasonModel from "../../../../../model/season/Season"
import ListingModel from "../../../../../model/listing/Listing"
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
          sub: `Driver - ${getDriver(season).fullName} ${getDriver(season).formattedNumber}`
        }),
        table: new ListingTableModel({
          columns: [
            {
              header: 'Round',
              accessorKey: 'round',
              enableSorting: true
            },
            {
              header: 'Weekend',
              accessorKey: 'weekend',
              enableSorting: true
            },
            {
              header: 'Date',
              accessorKey: 'date',
              enableSorting: true
            },
            {
              header: 'Circuit Name',
              accessorKey: 'circuit',
              enableSorting: true
            },
            {
              header: 'Q1',
              accessorKey: 'q1',
              enableSorting: true
            },
            {
              header: 'Q2',
              accessorKey: 'q2',
              enableSorting: true
            },
            {
              header: 'Q3',
              accessorKey: 'q3',
              enableSorting: true
            },
            {
              header: 'Position',
              accessorKey: 'pos',
              enableSorting: true
            },
          ],
          data: season.weekends.map(weekend => ({
            round: weekend.round,
            weekend: weekend.name,
            date: weekend.getFormattedDate('MMM dd.'),
            circuit: weekend.circuit.name,
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


// this.info = [
//   {
//     category: 'Driver Information',
//     data: [
//       { title: 'Full Name', desc: this.driver.fullName, icon: <SportsMotorsportsIcon /> },
//       { title: 'Nationality', desc: this.driver.nationality, icon: <PublicIcon /> },
//       { title: 'Date of Birth', desc: this.driver.dateOfBirth, icon: <CakeIcon /> },
//       { title: 'Driver code, number', desc: `${this.driver.code} ${this.driver.formattedNumber}`, icon: <TagIcon /> },
//     ]
//   },
//   {
//     category: 'Driver Achievements',
//     data: [
//       { title: 'Pole Positions', desc: this.poles(), icon: <WorkspacePremiumIcon /> },
//       { title: 'Got to the Front Row', desc: this.frontRows(), icon: <UnfoldLessDoubleIcon /> },
//       { title: 'Reached Q3', desc: this.reachedQ3(), icon: <StarHalfIcon /> },
//       { title: 'Eliminated in Q1', desc: this.eliminated(), icon: <ThumbDownOffAltIcon /> }
//     ]
//   },
// ]
