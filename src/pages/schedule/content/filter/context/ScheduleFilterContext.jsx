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

export const ScheduleFilterContext = createContext()

export const ScheduleFilterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<ScheduleFilterContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</ScheduleFilterContext.Provider>
	)
}
