import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

// model
import FilterOptionsModel from '../../../../../model/filter/FilterOptions'
import FilterOption from '../../../../../model/filter/FilterOption'
import SkeletonSelector from '../../../../../components/skeleton/SkeletonSelector'

const FilterPicker = () => {
	const { seasons, standings, ids, sessions, dispatch } = useResultsFilterContext()
	const { year, id } = useParams()
	const { pathname } = useLocation()

	const [filter, setFilter] = useState({
		year: year ? seasons.get(year) : seasons.data[0],
		standings: standings.data.find(s => pathname.includes(s.value)) || standings.data[0],
		session: sessions.data.find(s => pathname.includes(s.value)) || sessions.data[0]
	})

	const { isLoading: roundsLoading } = useQuery({
		queryKey: ['filter', 'season', filter.year.value],
		queryFn: () => FilterOptionsModel.queryRounds(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'rounds'
	})

	const { isLoading: driversLoading } = useQuery({
		queryKey: ['filter', 'driverStandings', filter.year.value],
		queryFn: () => FilterOptionsModel.queryDrivers(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'drivers'
	})

	const { isLoading: constructorsLoading } = useQuery({
		queryKey: ['filter', 'constructorStandings', filter.year.value],
		queryFn: () => FilterOptionsModel.queryConstructors(filter.year.value),
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
		if (filter.standings.value === 'rounds' && filter.id?.value !== 'all') {
			route += `/${filter.session.value}`
		}

		navigate(route, { replace: true })
	}, [navigate, filter, id])

	return (
		<div className="filter-picker">
			<label className={seasons.key}>
				<span>{seasons.label}</span>
				<Select
					onChange={option => setFilter(prev => ({ ...prev, year: option, id: FilterOption.DEFAULT }))}
					placeholder={filter.year.label}
					value={filter.year.value}
					options={seasons.data}
					isSearchable={true}
				/>
			</label>

			<label className={standings.key}>
				<span>{standings.label}</span>
				<Select
					onChange={option => setFilter(prev => ({ ...prev, standings: option, id: FilterOption.DEFAULT }))}
					placeholder={filter.standings.label}
					value={filter.standings.value}
					options={standings.data}
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
						options={ids.data}
						isSearchable={true}
						isLoading={roundsLoading || driversLoading || constructorsLoading}
					/>
				</label>
			) : <SkeletonSelector counter={1} />}

			{filter.standings.value === 'rounds' && filter.id?.value !== 'all' && (
				<label className={sessions.key}>
					<span>{sessions.label}</span> 
					<Select
						onChange={option => setFilter(prev => ({ ...prev, session: option }))}
						placeholder={filter.session.label}
						value={filter.session.value}
						options={sessions.data}
						isSearchable={false}
					/>
				</label>
			)}
		</div>
	)
}

export default FilterPicker
