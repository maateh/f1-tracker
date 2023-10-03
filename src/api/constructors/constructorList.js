import ergast, { CONSTRUCTOR_TABLE } from "../ergast"

// models
import ConstructorModel from "../../model/season/weekend/results/constructor/Constructor"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get a list with all of the constructors in F1
export async function constructorList(params) {
  const url = '/constructors'

  return ergast({
    url,
    key: CONSTRUCTOR_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Constructors || !data.Constructors.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        constructors: ConstructorModel.parseList({
          Constructors: data.Constructors,
        })
      }
    })
}
  
// Get a list with all of the constructor from a specific season
export async function constructorListFromSeason(year, params = { limit: 60 }) {
  const url = `/${year}/constructors`

  return ergast({
    url,
    key: CONSTRUCTOR_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Constructors || !data.Constructors.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        constructors: ConstructorModel.parseList({
          Constructors: data.Constructors,
        })
      }
    })
}
