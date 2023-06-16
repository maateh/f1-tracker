import { createContext, useReducer } from 'react'

// model
import CurrentFilters from '../model/filter/CurrentFilters'

const resultsFilterReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CURRENT_FILTERS':
			return { ...state, currentFilters: action.payload }
		default:
			return state
	}
}

export const ResultsFilterContext = createContext()

export const ResultsFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(resultsFilterReducer, {
		currentFilters: new CurrentFilters()
	})

	return (
		<ResultsFilterContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ResultsFilterContext.Provider>
	)
}
