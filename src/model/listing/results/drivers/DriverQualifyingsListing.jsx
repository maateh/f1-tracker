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
import { driverQualifyingsResults } from "../../../../api/results"

// model
import Season from "../../../season/Season"
import QueryError from "../../../error/QueryError"

class DriverQualifyingsListing {
  static async query(year, driverId) {
    return driverQualifyingsResults(year, driverId)
      .then(data => {
        const season = new Season(data)
        if (!season.weekends) {
          throw new QueryError('No data found!', 404)
        }
        return new DriverQualifyingsListing(season)
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  }

  constructor(season) {
    this.season = season
    this.title = `${season.year} Qualifying Results - ${this.driver.fullName} ${this.driver.formattedNumber}`
    
    this.info = [
      {
        category: 'Driver Information',
        data: [
          { title: 'Full Name', desc: this.driver.fullName, icon: <SportsMotorsportsIcon /> },
          { title: 'Nationality', desc: this.driver.nationality, icon: <PublicIcon /> },
          { title: 'Date of Birth', desc: this.driver.dateOfBirth, icon: <CakeIcon /> },
          { title: 'Driver code, number', desc: `${this.driver.code} ${this.driver.formattedNumber}`, icon: <TagIcon /> },
        ]
      },
      {
        category: 'Driver Achievements',
        data: [
          { title: 'Pole Positions', desc: this.poles(), icon: <WorkspacePremiumIcon /> },
          { title: 'Got to the Front Row', desc: this.frontRows(), icon: <UnfoldLessDoubleIcon /> },
          { title: 'Reached Q3', desc: this.reachedQ3(), icon: <StarHalfIcon /> },
          { title: 'Eliminated in Q1', desc: this.eliminated(), icon: <ThumbDownOffAltIcon /> }
        ]
      },
    ]

    this.header = [
      { key: 'round', placeholder: 'Round' },
      { key: 'weekend', placeholder: 'Weekend' },
      { key: 'date', placeholder: 'Date' },
      { key: 'circuit', placeholder: 'Circuit Name' },
      { key: 'q1', placeholder: 'Q1' },
      { key: 'q2', placeholder: 'Q2' },
      { key: 'q3', placeholder: 'Q3' },
      { key: 'pos', placeholder: 'Position' },
    ]

    this.table = season.weekends.map((w, index) => ({
      key: index,
      data: [
        { key: 'round', data: w.round },
        { key: 'weekend', data: w.name },
        { key: 'date', data: w.getFormattedDate('MMM dd.') },
        { key: 'circuit', data: w.circuit.name },
        { key: 'q1', data: w.result.qualifying[0].q1 },
        { key: 'q2', data: w.result.qualifying[0].q2 },
        { key: 'q3', data: w.result.qualifying[0].q3 },
        { key: 'pos', data: w.result.qualifying[0].position }
      ]
    }))
  }

  get driver() {
    return this.season.weekends[0].result.qualifying[0].driver
  }

  poles() {
    return this.season.weekends.map(w => (
      w.result.qualifying
        .filter(r => +r.position === 1)
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  frontRows() {
    return this.season.weekends.map(w => (
      w.result.qualifying
        .filter(r => +r.position <= 2)
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  reachedQ3() {
    return this.season.weekends.map(w => (
      w.result.qualifying
        .filter(r => !r.q3.includes('-'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }

  eliminated() {
    return this.season.weekends.map(w => (
      w.result.qualifying
        .filter(r => r.q2.includes('-'))
        .map(r => r.driver.code)
    )).flat(1).length + ' times in this season'
  }
}

export default DriverQualifyingsListing
