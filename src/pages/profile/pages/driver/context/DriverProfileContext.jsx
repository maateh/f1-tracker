import { createContext, useReducer } from "react"

// actions
import * as actionType from './DriverProfileContextActions'

const INITIAL_STATE = {
  driver: null,
  standings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_DRIVER:
			return { ...state, driver: action.payload }
    case actionType.SET_STANDINGS:
      return { ...state, standings: action.payload }
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

  return (
    <DriverProfileContext.Provider value={{
      ...state,
      dispatch,
      setDriver,
      setStandings
    }}>
      {children}
    </DriverProfileContext.Provider>
  )
}

export default DriverProfileContextProvider
