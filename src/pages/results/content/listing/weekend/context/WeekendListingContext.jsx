import { createContext, useReducer } from 'react'

// model
import WeekendInfoModel from '../../../../../../model/season/weekend/result/info/WeekendInfo'

const INITIAL_STATE = {
	loading: false,
	error: null,
	data: null,
	info: null,
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, loading: true, error: null, data: null }
		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
				data: action.payload,
				info: new WeekendInfoModel(action.payload),
			}
		case 'FETCH_ERROR':
			return { ...state, loading: false, error: action.payload, data: null }
		default:
			return state
	}
}

export const WeekendListingContext = createContext()

export const WeekendListingContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<WeekendListingContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</WeekendListingContext.Provider>
	)
}
