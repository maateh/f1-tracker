// hooks
import { fetchData } from "../../api/fetchData"

// model
import Result from "./Result"
import Weekend from "../schedule/weekend/Weekend"
import Schedule from "../schedule/Schedule"


class ResultList {
  constructor(data) {
    return data.Results.map(result => new Result(result))
  }

  static async fetchWeekends(url) {
    return fetchData(url, 'RaceTable', '?limit=300')
      .then(data => new Schedule(data))
      .catch(err => {
        throw new Error(err)
      })
  }

  static async fetchWeekend(url) {
    return fetchData(url, 'RaceTable')
      .then(data => new Weekend(data.Races[0]))
      .catch(err => {
        throw new Error(err)
      })
  }
}

export default ResultList