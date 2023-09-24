import { createContext, useReducer } from "react"

// actions
import * as actionType from './DriverProfileContextActions'

const INITIAL_STATE = {
  driver: null,
  standings: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_DRIVER:
			return { ...state, driver: action.payload }
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

export const DriverProfileContext = createContext()

const DriverProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  const setDriver = ({ driver }) => {
    dispatch({
      type: actionType.SET_DRIVER,
      payload: driver
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
    <DriverProfileContext.Provider value={{
      ...state,
      dispatch,
      setDriver,
      setStandings,
      setRaces,
      setQualifyings
    }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
