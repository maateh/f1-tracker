import { createContext, useReducer } from "react"

// actions
import * as actionType from './CircuitProfileContextActions'

const INITIAL_STATE = {
  circuit: null,
  racesAmount: null,
  cards: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_CIRCUIT:
			return { ...state, circuit: action.payload }
    case actionType.SET_RACES_AMOUNT:
      return { ...state, racesAmount: action.payload }
    default:
      return state
  }
}

export const CircuitProfileContext = createContext()

const CircuitProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  const setCircuit = ({ circuit }) => {
    dispatch({
      type: actionType.SET_CIRCUIT,
      payload: circuit
    })
  }

  const setRacesAmount = ({ racesAmount }) => {
    dispatch({
      type: actionType.SET_RACES_AMOUNT,
      payload: racesAmount
    })
  }

  return (
    <CircuitProfileContext.Provider value={{
      ...state,
      dispatch,
      setCircuit,
      setRacesAmount
    }}>
      {children}
    </CircuitProfileContext.Provider>
  )
}

export default CircuitProfileContextProvider
