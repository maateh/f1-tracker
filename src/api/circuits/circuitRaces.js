import { KEYS, ergast } from "../ergast"

// Get a list with all of the races in this circuit
export async function circuitRaces(circuitId) {
  return ergast({
    url: `/circuits/${circuitId}/races`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
