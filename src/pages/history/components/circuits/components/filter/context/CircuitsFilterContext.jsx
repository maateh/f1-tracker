import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	selectors: {
		seasons: null
	}
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEASONS':
			return { ...state, selectors: { ...state.selectors, seasons: action.payload } }
		default:
			return state
	}
}

export const CircuitsFilterContext = createContext()

export const CircuitsFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<CircuitsFilterContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</CircuitsFilterContext.Provider>
	)
}
