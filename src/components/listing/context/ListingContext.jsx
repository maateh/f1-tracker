import { createContext, useReducer } from "react"

// actions
import * as actionType from './ListingContextActions'

const INITIAL_STATE = {
  title: null,
  cards: null,
  table: null,
  pagination: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_TITLE:
			return { ...state, title: action.payload }
    case actionType.SET_CARDS:
      return { ...state, cards: action.payload }
    case actionType.ADD_CARDS:
      return { ...state, cards: { ...state.cards, layouts: action.payload }}
    case actionType.SET_TABLE:
      return { ...state, table: action.payload }
    case actionType.SET_PAGINATION:
      return { ...state, pagination: action.payload }
    default:
      return state
  }
}

export const ListingContext = createContext()

const ListingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

  return (
    <ListingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListingContext.Provider>
  )
}

export default ListingContextProvider
