import { createContext, useReducer } from "react"

// actions
import * as actionType from './ConstructorProfileContextActions'

const INITIAL_STATE = {
  constructor: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_CONSTRUCTOR:
			return { ...state, constructor: action.payload }
    case actionType.SET_RACES_RESULTS:
			return { ...state, races: action.payload }
    case actionType.SET_QUALIFYINGS_RESULTS:
      return { ...state, qualifyings: action.payload }
    default:
      return state
  }
}

export const ConstructorProfileContext = createContext()

const ConstructorProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  return (
    <ConstructorProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
