import ergast, { CIRCUIT_TABLE } from "../ergast"

// models
import CircuitModel from "../../model/season/weekend/circuit/Circuit"
import DataNotFoundError from "../../model/error/DataNotFoundError"

// Get info from a circuit
export async function circuit(circuitId) {
  const url = `/circuits/${circuitId}`

  return ergast({
    url,
    key: CIRCUIT_TABLE
  })
    .then(({ info, data }) => {
      if (!data.Circuits || !data.Circuits.length) {
        throw new DataNotFoundError(url)
      }

      return {
        info,
        circuit: CircuitModel.parser({ Circuit: data.Circuits[0] })
      }
    })
}
