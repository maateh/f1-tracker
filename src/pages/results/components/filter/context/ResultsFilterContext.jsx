import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	selectors: {
		seasons: null,
		standings: null,
		ids: null,
		sessions: null
	}
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEASONS':
			return { ...state, selectors: { ...state.selectors, seasons: action.payload } }
		case 'SET_STANDINGS':
			return { ...state, selectors: { ...state.selectors, standings: action.payload } }
		case 'SET_IDS':
			return { ...state, selectors: { ...state.selectors, ids: action.payload } }
		case 'SET_SESSIONS':
			return { ...state, selectors: { ...state.selectors, sessions: action.payload } }
		default:
			return state
	}
}

export const ResultsFilterContext = createContext()

export const ResultsFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<ResultsFilterContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</ResultsFilterContext.Provider>
	)
}
