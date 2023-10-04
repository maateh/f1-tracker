import { createContext, useReducer } from "react"

// constants
import * as actionType from './constants/ConstructorProfileContextActions'

const INITIAL_STATE = {
  standingsList: null,
  races: null,
  qualifyings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
    case actionType.CONSTRUCTOR_SET_STANDINGS_LIST:
      return { ...state, standingsList: action.payload }
    case actionType.CONSTRUCTOR_SET_RACES:
      return { ...state, races: action.payload }
    case actionType.CONSTRUCTOR_SET_QUALIFYINGS:
      return { ...state, qualifyings: action.payload }
    default:
      return state
  }
}

export const ConstructorProfileContext = createContext()

const ConstructorProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)
  
  const setStandingsList = ({ standingsList }) => {
    dispatch({
      type: actionType.CONSTRUCTOR_SET_STANDINGS_LIST,
      payload: standingsList
    })
  }

  const setRaces = ({ races }) => {
    dispatch({
      type: actionType.CONSTRUCTOR_SET_RACES,
      payload: races
    })
  }

  const setQualifyings = ({ qualifyings }) => {
    dispatch({
      type: actionType.CONSTRUCTOR_SET_QUALIFYINGS,
      payload: qualifyings
    })
  }
  
  return (
    <ConstructorProfileContext.Provider value={{
      ...state,
      dispatch,
      setStandingsList,
      setRaces,
      setQualifyings
    }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
