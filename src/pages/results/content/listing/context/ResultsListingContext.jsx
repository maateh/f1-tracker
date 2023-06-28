import { createContext, useReducer } from "react";

const INITIAL_RESULTS_LISTING_STATE = {
  loading: false,
  error: null,
  season: null,
  weekend: null,
  weekendSession: null
}

const resultsListingReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SEASON_START':
      return { ...state, loading: true, error: null, season: null }
    case 'FETCH_SEASON_SUCCESS':
      return { ...state, loading: false, error: null, season: action.payload }
    case 'FETCH_SEASON_ERROR':
      return { ...state, loading: false, error: action.payload, season: null }
    case 'FETCH_WEEKEND_START':
      return { ...state, loading: true, error: null, weekend: null }
    case 'FETCH_WEEKEND_SUCCESS':
      return { ...state, loading: false, error: null, weekend: action.payload }
    case 'FETCH_WEEKEND_ERROR':
      return { ...state, loading: false, error: action.payload, weekend: null }
    default:
      return state
  }
}

export const ResultsListingContext = createContext()

export const ResultsListingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resultsListingReducer, INITIAL_RESULTS_LISTING_STATE)

  return (
    <ResultsListingContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ResultsListingContext.Provider>
  )
}