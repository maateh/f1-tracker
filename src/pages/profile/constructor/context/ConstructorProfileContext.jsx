import { createContext, useReducer } from "react"

// actions
import * as actionType from './ConstructorProfileContextActions'

const INITIAL_STATE = {
  constructor: null,
  standings: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_CONSTRUCTOR:
			return { ...state, constructor: action.payload }
    case actionType.SET_STANDINGS:
      return { ...state, standings: action.payload }
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

  const setConstructor = ({ constructor }) => {
    dispatch({
      type: actionType.SET_CONSTRUCTOR,
      payload: constructor
    })
  }
  
  const setStandings = ({ standings }) => {
    dispatch({
      type: actionType.SET_STANDINGS,
      payload: standings
    })
  }

  const setRaces = ({ races }) => {
    dispatch({
      type: actionType.SET_RACES_RESULTS,
      payload: races
    })
  }

  const setQualifyings = ({ qualifyings }) => {
    dispatch({
      type: actionType.SET_QUALIFYINGS_RESULTS,
      payload: qualifyings
    })
  }

  return (
    <ConstructorProfileContext.Provider value={{
      ...state,
      dispatch,
      setConstructor,
      setStandings,
      setRaces,
      setQualifyings
    }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
