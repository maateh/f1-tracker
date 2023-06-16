import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../../context/hooks/useResultsFilterContext'

// model
import FilterOptionsModel from '../../../../model/filter/FilterOptions'

// styles
import './FilterOptions.css'

const FilterOptions = () => {
	const { currentFilters, dispatch } = useResultsFilterContext()
	const navigate = useNavigate()

	const [options, setOptions] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		navigate(currentFilters.getRoute(), { replace: true })
	}, [navigate, currentFilters])

	useEffect(() => {
		setLoading(true)
		FilterOptionsModel.fetch(currentFilters.year.value)
			.then(data => setOptions(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false))
	}, [currentFilters.year])

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

	return loading ? 'loading' : error ? 'error' : options && (
		<div className="filter-options">
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

export default FilterOptions
