import { createContext, useReducer } from "react"

// actions
import * as actionType from './ConstructorProfileContextActions'

const INITIAL_STATE = {
  constructor: null,
  standings: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_CONSTRUCTOR:
			return { ...state, constructor: action.payload }
    case actionType.SET_STANDINGS:
      return { ...state, standings: action.payload }
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

  return (
    <ConstructorProfileContext.Provider value={{
      ...state,
      dispatch,
      setConstructor,
      setStandings
    }}>
      {children}
    </ConstructorProfileContext.Provider>
  )
}

export default ConstructorProfileContextProvider
