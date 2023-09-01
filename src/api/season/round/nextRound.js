import { KEYS, ergast } from "../../ergast"

// Get info from the next weekend
export async function nextRound() {
  return ergast({
    url: '/current/next',
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
