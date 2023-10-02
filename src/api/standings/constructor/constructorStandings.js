import ergast, { KEYS } from "../../ergast"

// Get a constructor championship standings results
export async function constructorStandings(constructorId) {
  return ergast({
    url: `/constructors/${constructorId}/constructorStandings`,
    key: KEYS.STANDINGS_TABLE,
    params: { limit: 100 }
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
