import { createContext, useReducer } from "react";

export const WeekendContext = createContext()

export const weekendReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEEKEND':
      return { weekend: action.payload }
    default:
      return state
  }
}

export const WeekendContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weekendReducer, {
    weekend: null
  })

  return (
    <WeekendContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WeekendContext.Provider>
  )
}