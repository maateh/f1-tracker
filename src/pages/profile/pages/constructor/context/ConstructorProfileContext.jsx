import { createContext } from "react"

export const ConstructorProfileContext = createContext()

const ConstructorProfileContextProvider = ({
  children,
  useConstructorQuery,
  useStandingsListQuery,
  useRacesQuery,
  useQualifyingsQuery
}) => {
  const state = {
    constructor: useConstructorQuery(),
    standingsList: useStandingsListQuery(),
    races: useRacesQuery(),
    qualifyings: useQualifyingsQuery()
  }
  
  return (
    <ConstructorProfileContext.Provider value={{ ...state }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
