import { createContext, useReducer } from 'react'

const INITIAL_RESULTS_FILTER_STATE = {
  loading: false,
  error: null,
  options: null
}

const resultsFilterReducer = (state, action) => {
	switch (action.type) {
    case 'FETCH_OPTIONS_START':
      return { ...state, loading: true, error: null, options: null }
    case 'FETCH_OPTIONS_SUCCESS':
      return { ...state, loading: false, error: null, options: action.payload }
    case 'FETCH_OPTIONS_ERROR':
      return { ...state, loading: false, error: action.payload, options: null }
		default:
			return state
	}
}

export const ResultsFilterContext = createContext()

export const ResultsFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(resultsFilterReducer, INITIAL_RESULTS_FILTER_STATE)

	return (
		<ResultsFilterContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ResultsFilterContext.Provider>
	)
}
