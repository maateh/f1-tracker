import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

const FilterPicker = () => {
	const { currentFilters, options, dispatch } = useResultsFilterContext()
	const navigate = useNavigate()

	const handleChange = (option, key) => {
		if (currentFilters.year.value === option.value) {
			return
		}
		if (key === 'year') {
			currentFilters.weekend = currentFilters.defaultWeekend
			currentFilters.session = currentFilters.defaultSession
		}

		currentFilters[key] = option
		dispatch({ type: 'SET_CURRENT_FILTERS', payload: currentFilters })
		navigate(currentFilters.getRoute(), { replace: true })
	}

	return (
		<div className="filter-picker">
			<label className="year">
				<span>Year</span>
				<Select
					onChange={option => handleChange(option, 'year')}
					placeholder={currentFilters.year.label}
					defaultValue={currentFilters.year.value}
					options={options.years}
					isSearchable={true}
				/>
			</label>
			<label className="round">
				<span>Weekend</span>
				<Select
					onChange={option => handleChange(option, 'weekend')}
					placeholder={currentFilters.weekend.label}
					defaultValue={currentFilters.weekend.value}
					options={options.weekends}
					isSearchable={true}
				/>
			</label>
			<label className="session">
				<span>Session</span>
				<Select
					onChange={option => handleChange(option, 'session')}
					placeholder={currentFilters.session.label}
					defaultValue={currentFilters.session.value}
					options={options.sessions}
					isSearchable={false}
				/>
			</label>
		</div>
	)
}

export default FilterPicker
