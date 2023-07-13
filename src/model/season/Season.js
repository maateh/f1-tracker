// api
import { season } from "../../api/season"

// model
import WeekendList from "../season/weekend/WeekendList"

class Season {
  constructor(data) {
    this.year = data.season
    this.parseWiki(data)
    this.parseWeekends(data)
  }

  static async query(year) {
    return season(year)
      .then(data => new Season(data))
      .catch(err => {
        throw new Error(err)
      })
  }

  parseWiki(data) {
    if (data.url) {
      this.wiki = data.url
    }
  }

  parseWeekends(data) {
    if (data.Races) {
      this.weekends = new WeekendList(data.Races)
    }
  }
}

export default Season