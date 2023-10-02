import ergast, { KEYS } from "../ergast"

// Get pit stops from a specific race
export async function pitStops(year, round) {
  return ergast({
    url: `/${year}/${round}/pitstops`,
    key: KEYS.RACE_TABLE,
    params: { limit: 200 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
