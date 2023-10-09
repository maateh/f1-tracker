import { createContext } from "react"

export const ConstructorProfileContext = createContext()

const ConstructorProfileContextProvider = ({
  children,
  useConstructorQuery,
  useStandingsListQuery,
  useRacesQuery,
  useQualifyingsQuery
}) => {
  const data = {
    constructor: useConstructorQuery(),
    standingsList: useStandingsListQuery(),
    races: useRacesQuery(),
    qualifyings: useQualifyingsQuery()
  }
  
  return (
    <ConstructorProfileContext.Provider value={{ ...data }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
