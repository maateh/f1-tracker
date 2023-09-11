import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
	selectors: {
		seasons: null,
		standings: null,
		ids: null,
		sessions: null,
	},
}

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEASONS':
			return {
				...state,
				selectors: { ...state.selectors, seasons: action.payload },
			}
		case 'SET_STANDINGS':
			return {
				...state,
				selectors: { ...state.selectors, standings: action.payload },
			}
		case 'SET_IDS':
			return {
				...state,
				selectors: { ...state.selectors, ids: action.payload },
			}
		case 'SET_SESSIONS':
			return {
				...state,
				selectors: { ...state.selectors, sessions: action.payload },
			}
		case 'UPDATE_PARAMS':
			return {
				selectors: state.selectors.seasons ? {
					...state.selectors,
					seasons: state.selectors.seasons.updateParam(action.payload.year),
				} : state.selectors.standings ? {
					...state.selectors,
					standings: state.selectors.standings.updateParam(action.payload.standings),
				} : state.selectors.ids ? {
					...state.selectors,
					ids: state.selectors.ids.updateParam(action.payload.id),
				} : state.selectors.sessions ? {
					...state.selectors,
					sessions: state.selectors.sessions.updateParam(action.payload.session || 'race'),
				} : { ...state.selectors },
			}
		default:
			return state
	}
}

export const FilterContext = createContext()

export const FilterContextProvider = ({ children, selectors }) => {
	const [state, dispatch] = useReducer(dataReducer, { selectors })

	return (
		<FilterContext.Provider value={{ ...state, dispatch }}>
			{children}
		</FilterContext.Provider>
	)
}
