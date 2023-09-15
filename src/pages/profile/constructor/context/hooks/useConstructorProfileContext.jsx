import { useContext } from "react"

// context
import { ConstructorProfileContext } from "../ConstructorProfileContext"

// models
import ContextError from "../../../../../model/error/ContextError"

const useConstructorProfileContext = () => {
  const context = useContext(ConstructorProfileContext)

  if (!context) {
    throw new ContextError('ConstructorProfileContext')
  }
  
  return context
}

export default useConstructorProfileContext
