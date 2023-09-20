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
    case actionType.ADD_CARDS_LAYOUTS:
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

const ListingContextProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState || INITIAL_STATE)

  const setTitle = ({ title }) => {
    dispatch({
      type: actionType.SET_TITLE,
      payload: title
    })
  }

  const setCards = ({ cards }) => {
    dispatch({
      type: actionType.SET_CARDS,
      payload: cards
    })
  }

  const updateCardsLayouts = ({ layouts }) => {
    dispatch({
      type: actionType.ADD_CARDS_LAYOUTS,
      payload: layouts
    })
  }

  const setTable = ({ table }) => {
    dispatch({
      type: actionType.SET_TABLE,
      payload: table
    })
  }

  const setPagination = ({ pagination }) => {
    dispatch({
      type: actionType.SET_PAGINATION,
      payload: pagination
    })
  }

  return (
    <ListingContext.Provider value={{
      ...state,
      dispatch,
      setTitle,
      setCards,
      updateCardsLayouts,
      setTable,
      setPagination
    }}>
      {children}
    </ListingContext.Provider>
  )
}

export default ListingContextProvider
