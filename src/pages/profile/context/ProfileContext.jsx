import { createContext } from "react"

export const ProfileContext = createContext()

const ProfileContextProvider = ({
  children,
  useInfoQuery,
  useStandingsListQuery,
  useRacesResultsQuery,
  useQualifyingsResultsQuery
}) => {  
  const data = {
    info: useInfoQuery(),
    standingsList: useStandingsListQuery(),
    racesResults: useRacesResultsQuery(),
    qualifyingsResults: useQualifyingsResultsQuery()
  }

  return (
    <ProfileContext.Provider value={data}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
