// api
import { qualifyingsResults, racesResults } from "../../../../api/results"

// loader
import { SeasonLoader } from "../../../../pages/results/content/listing/loader/races/SeasonLoader"

// models
import Season from "../../Season"

class ResultList {
  static async queryResults(year) {
    return Promise.all([qualifyingsResults(year), racesResults(year)])
      .then(data => {
        data[1].Races.forEach((w, index) => w.QualifyingResults = data[0].Races[index].QualifyingResults)
        const season = new Season(data[1])
        return new SeasonLoader(season)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  // NOT CURRENTLY IN USE
  static async queryQualifyingsResults(year) {
    return qualifyingsResults(year)
      .then(data => {
        const season = new Season(data)
        // return new 
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  // NOT CURRENTLY IN USE
  static async queryRacesResults(year) {
    return racesResults(year)
      .then(data => {
        const season = new Season(data)
        // return new 
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}

export default ResultList