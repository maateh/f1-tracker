// api
import { fetchData } from "../../../../api/fetchData"

// models
import Season from "../../Season"

class ResultList {
  static async fetchResults(year) {
    const fetchQualifyings = fetchData(`/${year}/qualifying`, 'RaceTable', '?limit=500')
    const fetchRaces = fetchData(`/${year}/results`, 'RaceTable', '?limit=500')

    return Promise.all([fetchQualifyings, fetchRaces])
      .then(data => {
        data[1].Races.forEach((w, index) => w.QualifyingResults = data[0].Races[index].QualifyingResults)
        return new Season(data[1])
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}

export default ResultList