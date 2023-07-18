import { createContext, useReducer } from 'react'

// model
import FilterOptionsModel from '../../../../../model/filter/FilterOptions'

const INITIAL_STATE = {
	seasons: null,
	standings: FilterOptionsModel.STANDINGS,
	ids: null,
	sessions: FilterOptionsModel.SESSIONS
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
