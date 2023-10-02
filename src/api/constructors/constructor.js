import ergast, { CONSTRUCTOR_TABLE } from "../ergast"

// models
import ConstructorModel from "../../model/season/weekend/results/constructor/Constructor"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get info from a constructor
export async function constructor(constructorId) {
  const url = `/constructors/${constructorId}`

  return ergast({
    url,
    key: CONSTRUCTOR_TABLE
  })
    .then(({ info, data }) => {
      if (!data.Constructors || !data.Constructors.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        constructor: ConstructorModel.parser({ Constructor: data.Constructors[0] })
      }
    })
}
