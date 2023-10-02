import ergast, { CIRCUIT_TABLE } from "../ergast"

// models
import CircuitModel from "../../model/season/weekend/circuit/Circuit"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get a list with all of the circuits in F1
export async function circuitList(params) {
  const url = `/circuits`

  return ergast({
    url,
    key: CIRCUIT_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Circuits || !data.Circuits.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        circuits: CircuitModel.parseList({ Circuits: data.Circuits })
      }
    })
}

// Get a list with all of the circuit from a specific season
export async function circuitListFromSeason(year, params = { limit: 60 }) {
  const url = `/${year}/circuits`

  return ergast({
    url,
    key: CIRCUIT_TABLE,
    params
  })
    .then(({ info, data }) => {
      if (!data.Circuits || !data.Circuits.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        circuits: CircuitModel.parseList({ Circuits: data.Circuits })
      }
    })
}
