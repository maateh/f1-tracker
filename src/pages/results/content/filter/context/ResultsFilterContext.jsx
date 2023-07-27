import { createContext, useReducer } from 'react'

// model
import FilterModel from '../../../../../model/filter/Filter'
import FilterOptionModel from '../../../../../model/filter/FilterOption'

const INITIAL_STATE = {
	seasons: null,
	standings: new FilterModel({
    key: 'standings',
    label: 'Standings',
    options: [
      new FilterOptionModel({ value: 'rounds', label: 'Rounds' }),
      new FilterOptionModel({ value: 'drivers', label: 'Drivers' }),
      new FilterOptionModel({ value: 'constructors', label: 'Constructors' }),
    ]
  }),
	ids: null,
	sessions: new FilterModel({
		key: 'sessions',
		label: 'Sessions',
		options: [
			new FilterOptionModel({ value: 'race', label: 'Race' }),
			new FilterOptionModel({ value: 'qualifying', label: 'Qualifying' }),
		]
	})
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
