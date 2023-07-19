import { createContext, useReducer } from 'react'

// model
import FilterModel from '../../../../../model/filter/Filter'

const INITIAL_STATE = {
	seasons: null,
	standings: FilterModel.STANDINGS,
	ids: null,
	sessions: FilterModel.SESSIONS
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEASONS':
			return { ...state, seasons: action.payload }
		case 'SET_IDS':
			return { ...state, ids: action.payload }
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
