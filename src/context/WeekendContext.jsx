import { createContext, useReducer } from "react";

const INITIAL_WEEKEND_STATE = {
  loading: false,
  error: null,
  weekend: null
}

const weekendReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null, weekend: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: null, weekend: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, weekend: null }
    default:
      return state
  }
}

export const WeekendContext = createContext()

export const WeekendContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weekendReducer, INITIAL_WEEKEND_STATE)

  return (
    <WeekendContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WeekendContext.Provider>
  )
}