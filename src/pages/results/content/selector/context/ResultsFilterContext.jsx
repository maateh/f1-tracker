import { createContext, useReducer } from 'react'

// model
import FilterOptionsModel from '../../../../../model/filter/FilterOptions'

const INITIAL_STATE = {
	loading: false,
	error: null,
	years: null,
	standings: FilterOptionsModel.STANDINGS,
	ids: null
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_YEARS_START':
			return { ...state, loading: true, error: null, years: null }
		case 'FETCH_YEARS_SUCCESS':
			return { ...state, loading: false, error: null, years: action.payload }
		case 'FETCH_YEARS_ERROR':
			return { ...state, loading: false, error: action.payload, years: null }

		case 'FETCH_ID_LIST_START':
			return { ...state, loading: true, error: null, ids: null }
		case 'FETCH_ID_LIST_SUCCESS':
			return { ...state, loading: false, error: null, ids: action.payload }
		case 'FETCH_ID_LIST_ERROR':
			return { ...state, loading: false, error: action.payload, ids: null }

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
