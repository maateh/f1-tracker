import { createContext, useReducer } from 'react'

// actions
import * as actionType from './FilterContextActions'

const dataReducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_SEASONS:
			return {
				...state,
				selectors: { ...state.selectors, seasons: action.payload },
			}
		case actionType.SET_STANDINGS:
			return {
				...state,
				selectors: { ...state.selectors, standings: action.payload },
			}
		case actionType.SET_ROUNDS:
			return {
				...state,
				selectors: { ...state.selectors, rounds: action.payload },
			}
		case actionType.SET_DRIVERS:
			return {
				...state,
				selectors: { ...state.selectors, drivers: action.payload },
			}
		case actionType.SET_CONSTRUCTORS:
			return {
				...state,
				selectors: { ...state.selectors, constructors: action.payload },
			}
		case actionType.SET_IDS:
			return {
				...state,
				selectors: { ...state.selectors, ids: action.payload },
			}
		case actionType.SET_SESSIONS:
			return {
				...state,
				selectors: { ...state.selectors, sessions: action.payload },
			}
		case actionType.RESULTS_PARAMS_UPDATER:
			return {
				selectors: {
					seasons: state.selectors.seasons.updateParam(action.payload.year),
					standings: state.selectors.standings.updateParam(
						action.payload.standings
					),
					ids: state.selectors.ids.updateParam(action.payload.id),
					sessions: state.selectors.sessions.updateParam(
						action.payload.session || 'race'
					),
				},
			}
		case actionType.LAPS_PARAMS_UPDATER:
			return {
				selectors: {
					seasons: state.selectors.seasons.updateParam(action.payload.year),
					rounds: state.selectors.rounds.updateParam(action.payload.round),
					drivers: state.selectors.drivers.updateParam(action.payload.driverId)
				},
			}
		case actionType.PITS_PARAMS_UPDATER:
			return {
				selectors: {
					seasons: state.selectors.seasons.updateParam(action.payload.year),
					rounds: state.selectors.rounds.updateParam(action.payload.round),
					drivers: state.selectors.drivers.updateParam(action.payload.driverId)
				},
			}
		default:
			return state
	}
}

export const FilterContext = createContext()

const FilterContextProvider = ({ children, selectors }) => {
	const [state, dispatch] = useReducer(dataReducer, { selectors })

	const setSeasons = ({ seasons }) => {
		dispatch({
			type: actionType.SET_SEASONS,
			payload: seasons
		})
	}

	const setStandings = ({ standings }) => {
		dispatch({
			type: actionType.SET_STANDINGS,
			payload: standings
		})
	}

	const setRounds = ({ rounds }) => {
		dispatch({
			type: actionType.SET_ROUNDS,
			payload: rounds
		})
	}

	const setDrivers = ({ drivers }) => {
		dispatch({
			type: actionType.SET_DRIVERS,
			payload: drivers
		})
	}

	const setConstructors = ({ constructors }) => {
		dispatch({
			type: actionType.SET_CONSTRUCTORS,
			payload: constructors
		})
	}

	const setIds = ({ ids }) => {
		dispatch({
			type: actionType.SET_IDS,
			payload: ids
		})
	}

	const setSessions = ({ sessions }) => {
		dispatch({
			type: actionType.SET_SESSIONS,
			payload: sessions
		})
	}

	return (
		<FilterContext.Provider value={{
			...state,
			dispatch,
			setSeasons,
			setStandings,
			setRounds,
			setDrivers,
			setConstructors,
			setIds,
			setSessions
		}}>
			{children}
		</FilterContext.Provider>
	)
}

export default FilterContextProvider
