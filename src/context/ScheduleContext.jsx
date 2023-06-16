import { createContext, useReducer } from "react";

const INITIAL_SCHEDULE_STATE = {
  loading: false,
  error: null,
  schedule: null,
  seasons: null,
  year: new Date().getFullYear()
}

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SCHEDULE_START':
      return { ...state, loading: true, error: null, schedule: null }
    case 'FETCH_SCHEDULE_SUCCESS':
      return { ...state, loading: false, error: null, schedule: action.payload }
    case 'FETCH_SCHEDULE_ERROR':
      return { ...state, loading: false, error: action.payload, schedule: null }
    case 'FETCH_SEASONS_START':
      return { ...state, loading: true, error: null, seasons: null }
    case 'FETCH_SEASONS_SUCCESS':
      return { ...state, loading: false, error: null, seasons: action.payload }
    case 'FETCH_SEASONS_ERROR':
      return { ...state, loading: false, error: action.payload, seasons: null }
    case 'SET_YEAR':
      return { ...state, year: action.payload }
    default:
      return state
  }
}

export const ScheduleContext = createContext()

export const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, INITIAL_SCHEDULE_STATE)

  return (
    <ScheduleContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ScheduleContext.Provider>
  )
}