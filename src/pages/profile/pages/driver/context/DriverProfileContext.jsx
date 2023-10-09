import { createContext } from "react"

export const DriverProfileContext = createContext()

const DriverProfileContextProvider = ({
  children,
  useDriverQuery,
  useStandingsListQuery,
  useRacesQuery,
  useQualifyingsQuery
}) => {
  const data = {
    driver: useDriverQuery(),
    standingsList: useStandingsListQuery(),
    races: useRacesQuery(),
    qualifyings: useQualifyingsQuery()
  }

  return (
    <DriverProfileContext.Provider value={{ ...data }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
