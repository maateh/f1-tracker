import { KEYS, ergast } from "../ergast"

// Get info from a circuit
export async function circuit(circuitId) {
  return ergast({
    url: `/circuits/${circuitId}`,
    key: KEYS.CIRCUIT_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
