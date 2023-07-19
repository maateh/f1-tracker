import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

// model
import FilterModel from '../../../../../model/filter/Filter'
import FilterOption from '../../../../../model/filter/FilterOption'
import SkeletonSelector from '../../../../../components/skeleton/SkeletonSelector'

const FilterPicker = () => {
	const { seasons, standings, ids, sessions, dispatch } = useResultsFilterContext()
	const { year, id } = useParams()
	const { pathname } = useLocation()

	const [filter, setFilter] = useState({
		year: year ? seasons.get(year) : seasons.options[0],
		standings: standings.options.find(s => pathname.includes(s.value)) || standings.options[0],
		session: sessions.options.find(s => pathname.includes(s.value)) || sessions.options[0]
	})

	const { isLoading: roundsLoading } = useQuery({
		queryKey: ['filter', 'season', filter.year.value],
		queryFn: () => FilterModel.queryRounds(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'rounds'
	})

	const { isLoading: driversLoading } = useQuery({
		queryKey: ['filter', 'driverList', filter.year.value],
		queryFn: () => FilterModel.queryDrivers(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'drivers'
	})

	const { isLoading: constructorsLoading } = useQuery({
		queryKey: ['filter', 'constructorList', filter.year.value],
		queryFn: () => FilterModel.queryConstructors(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'constructors'
	})	

	useEffect(() => {
		if (filter.id) return
		setFilter(prev => ({ ...prev, id: ids?.get(id || 'all') }))
	}, [filter.id, ids, id])

	const navigate = useNavigate()
	useEffect(() => {
		if (!filter.id) return

		let route = `./${filter.year.value}/${filter.standings.value}/${filter.id.value}`
		if (filter.standings.value.match('^(drivers|rounds)$') && filter.id?.value !== 'all') { 
			route += `/${filter.session.value}`
		}

		navigate(route, { replace: true })
	}, [navigate, filter, id, sessions])

	return (
		<div className="filter-picker">
			<label className={seasons.key}>
				<span>{seasons.label}</span>
				<Select
					onChange={option => setFilter(prev => ({ ...prev, year: option, id: FilterOption.DEFAULT }))}
					placeholder={filter.year.label}
					value={filter.year.value}
					options={seasons.options}
					isSearchable={true}
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
				/>
			</label>


			{ids ? (
				<label className={ids.key}>
					<span>{ids.label}</span> 
					<Select
						onChange={option => setFilter(prev => ({ ...prev, id: option }))}
						placeholder={filter.id?.label}
						value={filter.id?.value}
						options={ids.options}
						isSearchable={true}
						isDisabled={roundsLoading || driversLoading || constructorsLoading}
						isLoading={roundsLoading || driversLoading || constructorsLoading}
					/>
				</label>
			) : <SkeletonSelector counter={1} />}

			{filter.standings.value.match('^(drivers|rounds)$') && filter.id?.value !== 'all' && (
				<label className={sessions.key}>
					<span>{sessions.label}</span> 
					<Select
						onChange={option => setFilter(prev => ({ ...prev, session: option }))}
						placeholder={filter.session.label}
						value={filter.session.value}
						options={sessions.options}
						isSearchable={false}
					/>
				</label>
			)}
		</div>
	)
}

export default FilterPicker
