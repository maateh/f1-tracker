import { createContext, useReducer } from "react"

// constants
import * as actionType from './constants/DriverProfileContextActions'

const INITIAL_STATE = {
  standingsList: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
    case actionType.DRIVER_SET_STANDINGS_LIST:
      return { ...state, standingsList: action.payload }
    case actionType.DRIVER_SET_RACES:
      return { ...state, races: action.payload }
    case actionType.DRIVER_SET_QUALIFYINGS:
      return { ...state, qualifyings: action.payload }
    default:
      return state
  }
}

export const DriverProfileContext = createContext()

const DriverProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)
  
  const setStandingsList = ({ standingsList }) => {
    dispatch({
      type: actionType.DRIVER_SET_STANDINGS_LIST,
      payload: standingsList
    })
  }

  const setRaces = ({ races }) => {
    dispatch({
      type: actionType.DRIVER_SET_RACES,
      payload: races
    })
  }

  const setQualifyings = ({ qualifyings }) => {
    dispatch({
      type: actionType.DRIVER_SET_QUALIFYINGS,
      payload: qualifyings
    })
  }

  return (
    <DriverProfileContext.Provider value={{
      ...state,
      dispatch,
      setStandingsList,
      setRaces,
      setQualifyings
    }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
