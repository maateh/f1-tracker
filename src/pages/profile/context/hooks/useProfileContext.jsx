import { useContext } from "react"

// context
import { ProfileContext } from "../ProfileContext"

// models
import ContextError from "../../../../model/error/ContextError"

const useProfileContext = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new ContextError('ProfileContext')
  }
  
  return context
}

export default useProfileContext
