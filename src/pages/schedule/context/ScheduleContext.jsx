import { createContext, useReducer } from "react";

const INITIAL_SCHEDULE_STATE = {
  schedule: null,
  seasons: null,
  year: new Date().getFullYear()
}

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload }
    case 'SET_SEASONS':
      return { ...state, seasons: action.payload }
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