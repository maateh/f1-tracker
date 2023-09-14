import { createContext, useReducer } from "react"

// actions
import * as actionType from './DriverProfileContextActions'

const INITIAL_STATE = {
  driver: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_DRIVER:
			return { ...state, driver: action.payload }
    case actionType.SET_RACES_RESULTS:
			return { ...state, races: action.payload }
    case actionType.SET_QUALIFYINGS_RESULTS:
      return { ...state, qualifyings: action.payload }
    default:
      return state
  }
}

export const DriverProfileContext = createContext()

const DriverProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  return (
    <DriverProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
