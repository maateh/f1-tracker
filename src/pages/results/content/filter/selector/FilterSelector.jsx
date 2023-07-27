import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

// model
import FilterOption from '../../../../../model/filter/FilterOption'

const FilterSelector = ({ loading }) => {
	const { seasons, standings, ids, sessions } = useResultsFilterContext()
	const { year, standings: st, id, session } = useParams()
	const navigate = useNavigate()

	const [filter, setFilter] = useState({
		year: year ? seasons.get(year) : seasons.options[0],
		standings: st ? standings.get(st) : standings.options[0],
		id: id ? ids.get(id) : ids.options[0],
		session: session ? sessions.get(session) : sessions.options[0]
	})

	useEffect(() => {
		let route = `./${filter.year.value}/${filter.standings.value}/${filter.id.value}`
		if (filter.standings.value.match('^(drivers|rounds)$') && filter.id.value !== 'all') { 
			route += `/${filter.session.value}`
		}
		navigate(route, { replace: true })
	}, [navigate, filter])

	return (
		<div className="filter-selector">
			<label className={seasons.key}>
				<span>{seasons.label}</span>
				<Select
					onChange={option => setFilter(prev => ({ ...prev, year: option, id: FilterOption.DEFAULT }))}
					placeholder={filter.year.label}
					value={filter.year.value}
					options={seasons.options}
					isSearchable={true}
					isDisabled={loading}
					isLoading={loading}
				/>
			</label>

			<label className={standings.key}>
				<span>{standings.label}</span>
				<Select
					onChange={option => setFilter(prev => ({ ...prev, standings: option, id: FilterOption.DEFAULT }))}
					placeholder={filter.standings.label}
					value={filter.standings.value}
					options={standings.options}
					isSearchable={false}
					isDisabled={loading}
					isLoading={loading}
				/>
			</label>

			<label className={ids.key}>
				<span>{ids.label}</span> 
				<Select
					onChange={option => setFilter(prev => ({ ...prev, id: option }))}
					placeholder={filter.id.label}
					value={filter.id.value}
					options={ids.options}
					isSearchable={true}
					isDisabled={loading}
					isLoading={loading}
				/>
			</label>

			{filter.standings.value.match('^(drivers|rounds)$') && filter.id.value !== 'all' && (
				<label className={sessions.key}>
					<span>{sessions.label}</span> 
					<Select
						onChange={option => setFilter(prev => ({ ...prev, session: option }))}
						placeholder={filter.session.label}
						value={filter.session.value}
						options={sessions.options}
						isSearchable={false}
						isDisabled={loading}
						isLoading={loading}
					/>
				</label>
			)}
		</div>
	)
}

export default FilterSelector
