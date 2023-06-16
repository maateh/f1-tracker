// api
import { fetchData } from "../../api/fetchData"

import WeekendList from "./weekend/WeekendList"

class Schedule {
  constructor(data) {
    this.year = data.season
    
    this.parseWeekends(data)
  }

  static async fetch(url) {
    return fetchData(url, 'RaceTable')
      .then(data => new Schedule(data))
      .catch(err => {
        throw new Error(err)
      })
  }

  parseWeekends(data) {
    if (data.Races) {
      this.weekends = new WeekendList(data)
    }
  }
}

export default Schedule