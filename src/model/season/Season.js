// api
import { fetchData } from "../../api/fetchData"

// model
import WeekendList from "../season/weekend/WeekendList"

class Season {
  constructor(data) {
    this.year = data.season
    this.wikiUrl = data.url

    this.parseWeekends(data)
  }

  static async fetch(url) {
    return fetchData(url, 'RaceTable')
      .then(data => new Season(data))
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

export default Season