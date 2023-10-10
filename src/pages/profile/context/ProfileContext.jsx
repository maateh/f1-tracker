import { createContext } from "react"

export const ProfileContext = createContext()

const ProfileContextProvider = ({
  children,
  dataWithQueries
  // useInfoQuery,
  // useStandingsListQuery,
  // useRacesResultsQuery,
  // useQualifyingsResultsQuery,
  // useWeekendsQuery
}) => {  
  // const data = {
  //   info: useInfoQuery(),
  //   standingsList: useStandingsListQuery(),
  //   racesResults: useRacesResultsQuery(),
  //   qualifyingsResults: useQualifyingsResultsQuery(),
  //   weekends: useWeekendsQuery()
  // }

  return (
    <ProfileContext.Provider value={dataWithQueries}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
