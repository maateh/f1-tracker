import ergast, { KEYS } from "../ergast"

// Get lap timings from a specific lap in a race
export async function raceLap(year, round, lap) {
  return ergast({
    url: `/${year}/${round}/laps/${lap}`,
    key: KEYS.RACE_TABLE, 
    params: { limit: 40 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
