import ergast, { KEYS } from "../../ergast"

// Get info from the last weekend
export async function lastRound() {
  return ergast({
    url: '/current/last',
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
