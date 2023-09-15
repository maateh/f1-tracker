import { createContext, useReducer } from "react"

// actions
import * as actionType from './CircuitProfileContextActions'

const INITIAL_STATE = {
  circuit: null,
  races: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_CIRCUIT:
			return { ...state, circuit: action.payload }
    case actionType.SET_RACES:
      return { ...state, races: action.payload }
    default:
      return state
  }
}

export const CircuitProfileContext = createContext()

const CircuitProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  return (
    <CircuitProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CircuitProfileContext.Provider>
  )
}

export default CircuitProfileContextProvider
