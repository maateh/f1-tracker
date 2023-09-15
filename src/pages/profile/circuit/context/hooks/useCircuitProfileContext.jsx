import { useContext } from "react"

// context
import { CircuitProfileContext } from "../CircuitProfileContext"

// models
import ContextError from "../../../../../model/error/ContextError"

const useCircuitProfileContext = () => {
  const context = useContext(CircuitProfileContext)

  if (!context) {
    throw new ContextError('CircuitProfileContext')
  }
  
  return context
}

export default useCircuitProfileContext
