import { KEYS, ergast } from "../../ergast"

// Get a list with all of the races in this circuit
export async function circuitRaces(circuitId, params = { limit: 30 }) {
  return ergast({
    url: `/circuits/${circuitId}/races`,
    key: KEYS.RACE_TABLE,
    params
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
