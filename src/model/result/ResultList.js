// api
import { fetchData } from "../../api/fetchData"

// model
import Result from "./Result"
import Weekend from "../season/weekend/Weekend"
import Season from "../season/Season"

class ResultList {
  constructor(data) {
    return data.Results.map(result => new Result(result))
  }

  static async fetchWeekends(url) {
    return fetchData(url, 'RaceTable', '?limit=300')
      .then(data => new Season(data))
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