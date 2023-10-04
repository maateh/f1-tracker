import { createContext, useReducer } from "react"
import { ErrorBoundary } from "react-error-boundary"

// components
import ErrorFallback from "../../error/fallbacks/ErrorFallback"

// constants
import * as actionType from './constants/ListingContextActions'

const INITIAL_STATE = {
  title: null,
  cards: null,
  table: null,
  pagination: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.LISTING_SET_TITLE:
			return { ...state, title: action.payload }
    case actionType.LISTING_SET_CARDS:
      return { ...state, cards: action.payload }
    case actionType.LISTING_ADD_CARDS_LAYOUTS:
      return { ...state, cards: { ...state.cards, layouts: action.payload }}
    case actionType.LISTING_SET_TABLE:
      return { ...state, table: action.payload }
    case actionType.LISTING_SET_PAGINATION:
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
      type: actionType.LISTING_SET_TITLE,
      payload: title
    })
  }

  const setCards = ({ cards }) => {
    dispatch({
      type: actionType.LISTING_SET_CARDS,
      payload: cards
    })
  }

  const updateCardsLayouts = ({ layouts }) => {
    dispatch({
      type: actionType.LISTING_ADD_CARDS_LAYOUTS,
      payload: layouts
    })
  }

  const setTable = ({ table }) => {
    dispatch({
      type: actionType.LISTING_SET_TABLE,
      payload: table
    })
  }

  const setPagination = ({ pagination }) => {
    dispatch({
      type: actionType.LISTING_SET_PAGINATION,
      payload: pagination
    })
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => console.log('toast message here')}>
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
    </ErrorBoundary>
  )
}

export default ListingContextProvider
