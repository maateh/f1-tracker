import { createContext, useReducer } from 'react'

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
		case 'RESULTS_PARAMS_UPDATER':
			return {
				...state,
				selectors: {
					seasons: state.selectors.seasons.updateParam(action.payload.year),
					standings: state.selectors.standings.updateParam(action.payload.standings),
					ids: state.selectors.ids.updateParam(action.payload.id),
					sessions: state.selectors.sessions.updateParam(action.payload.session || 'race'),
				},
			}
		default:
			return state
	}
}

export const FilterContext = createContext()

const FilterContextProvider = ({ children, selectors }) => {
	const [state, dispatch] = useReducer(dataReducer, { selectors })

	return (
		<FilterContext.Provider value={{ ...state, dispatch }}>
			{children}
		</FilterContext.Provider>
	)
}

export default FilterContextProvider
