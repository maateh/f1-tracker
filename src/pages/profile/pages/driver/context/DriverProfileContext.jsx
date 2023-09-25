import { createContext, useReducer } from "react"

// actions
import * as actionType from './DriverProfileContextActions'

const INITIAL_STATE = {
  driver: null,
  standingsList: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_DRIVER:
			return { ...state, driver: action.payload }
    case actionType.SET_STANDINGS_LIST:
      return { ...state, standingsList: action.payload }
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
  
  const setStandingsList = ({ standingsList }) => {
    dispatch({
      type: actionType.SET_STANDINGS_LIST,
      payload: standingsList
    })
  }

  return (
    <DriverProfileContext.Provider value={{
      ...state,
      dispatch,
      setDriver,
      setStandingsList
    }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
