import { createContext } from "react"

export const ProfileContext = createContext()

const ProfileContextProvider = ({ children, dataWithQueries }) => {
  return (
    <ProfileContext.Provider value={dataWithQueries}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
