import ergast, { KEYS } from "../ergast"

// Get info from a constructor
export async function constructor(constructorId) {
  return ergast({
    url: `/constructors/${constructorId}`,
    key: KEYS.CONSTRUCTOR_TABLE
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
