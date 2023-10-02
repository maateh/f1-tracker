import ergast, { KEYS } from "../ergast"

// Get info from a specific season
export async function season(year) {
  return ergast({
    url: `/${year}`,
    key: KEYS.RACE_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
