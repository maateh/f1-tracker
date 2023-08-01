import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	selectors: {
		seasons: null,
		rounds: null,
		types: null,
		ids: null
	}
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEASONS':
			return { ...state, selectors: { ...state.selectors, seasons: action.payload } }
		case 'SET_ROUNDS':
			return { ...state, selectors: { ...state.selectors, rounds: action.payload } }
		case 'SET_TYPES':
			return { ...state, selectors: { ...state.selectors, types: action.payload } }
		case 'SET_IDS':
			return { ...state, selectors: { ...state.selectors, ids: action.payload } }
		default:
			return state
	}
}

export const PitsFilterContext = createContext()

export const PitsFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<PitsFilterContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</PitsFilterContext.Provider>
	)
}
