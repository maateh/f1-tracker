import { createContext, useReducer } from 'react'

// model
import SeasonInfoModel from '../../../../../../model/season/weekend/result/info/SeasonInfo'

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
				info: new SeasonInfoModel(action.payload),
			}
		case 'FETCH_ERROR':
			return { ...state, loading: false, error: action.payload, data: null }
		default:
			return state
	}
}

export const SeasonListingContext = createContext()

export const SeasonListingContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE)

	return (
		<SeasonListingContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</SeasonListingContext.Provider>
	)
}
