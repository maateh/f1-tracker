import { useContext } from "react"

// context
import { DriverProfileContext } from "../DriverProfileContext"

// models
import ContextError from "../../../../../model/error/ContextError"

const useDriverProfileContext = () => {
  const context = useContext(DriverProfileContext)

  if (!context) {
    throw new ContextError('DriverProfileContext')
  }
  
  return context
}

export default useDriverProfileContext
