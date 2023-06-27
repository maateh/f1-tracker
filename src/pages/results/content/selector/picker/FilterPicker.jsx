import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

const FilterPicker = () => {
	const params = useParams()
	const navigate = useNavigate()

	const { options } = useResultsFilterContext()
	const [filter, setFilter] = useState({
		year: params.year ? params.year : 2023,
		weekend: params.weekend ? params.weekend : 'all',
		session: params.session ? params.session : 'summary',
	})

	useEffect(() => {
		navigate(`./${filter.year}/${filter.weekend}/${filter.session}`, {
			replace: true,
		})
	}, [navigate, filter])

	return (
		<div className="filter-picker">
			<label className="year">
				<span>Year</span>
				<Select
					onChange={option =>
						setFilter(
							prev => {
								return prev.year === option.value ? { ...prev } : {
									year: option.value,
									weekend: 'all',
									session: 'summary',
								}
							}
						)
					}
					placeholder={filter.year}
					value={filter.year}
					options={options.years}
					isSearchable={true}
				/>
			</label>
			<label className="weekend">
				<span>Weekend</span>
				<Select
					onChange={option =>
						setFilter(prev => ({ ...prev, weekend: option.value }))
					}
					placeholder={options.getWeekendName(filter.weekend)}
					value={filter.weekend}
					options={options.weekends}
					isSearchable={true}
				/>
			</label>
			<label className="session">
				<span>Session</span>
				<Select
					onChange={option =>
						setFilter(prev => ({ ...prev, session: option.value }))
					}
					placeholder={options.getSessionLabel(filter.session)}
					value={filter.session}
					options={options.sessions}
					isSearchable={false}
				/>
			</label>
		</div>
	)
}

export default FilterPicker
