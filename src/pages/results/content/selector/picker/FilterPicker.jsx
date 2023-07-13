import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// components
import SkeletonSelector from '../../../../../components/skeleton/SkeletonSelector'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

// model
import FilterOptionsModel from '../../../../../model/filter/FilterOptions'

const FilterPicker = () => {
	const { seasons, standings, ids, dispatch } = useResultsFilterContext()

	const { year } = useParams()
	const { pathname } = useLocation()

	const [filter, setFilter] = useState({
		year: year ? seasons.get(year) : seasons.data[0],
		standings: standings.data.find(s => pathname.includes(s.value)) || standings.data[0]
	})

	const { isLoading: roundsLoading } = useQuery({
		queryKey: ['season', filter.year.value],
		queryFn: () => FilterOptionsModel.queryRounds(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'rounds'
	})

	const { isLoading: driversLoading } = useQuery({
		queryKey: ['driverStandings', filter.year.value],
		queryFn: () => FilterOptionsModel.queryDrivers(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'drivers'
	})

	const { isLoading: constructorsLoading } = useQuery({
		queryKey: ['constructorStandings', filter.year.value],
		queryFn: () => FilterOptionsModel.queryConstructors(filter.year.value),
		onSuccess: data => dispatch({ type: 'SET_IDS', payload: data }),
		enabled: filter.standings.value === 'constructors'
	})

	const navigate = useNavigate()
	useEffect(() => {
		navigate(`./${filter.year.value}/${filter.standings.value}/${filter.id ? filter.id.value : 'all'}`, {
			replace: true
		})
	}, [navigate, filter])

	return (
		<div className="filter-picker">
			<label className={seasons.key}>
				<span>{seasons.label}</span>
				<Select
					onChange={option => 
						setFilter(prev => ({ year: option, standings: prev.standings }))
					}
					placeholder={filter.year.label}
					value={filter.year.value}
					options={seasons.data}
					isSearchable={true}
				/>
			</label>

			<label className={standings.key}>
				<span>{standings.label}</span>
				<Select
					onChange={option =>
						setFilter(prev => ({ year: prev.year, standings: option }))
					}
					placeholder={filter.standings.label}
					value={filter.standings.value}
					options={standings.data}
					isSearchable={true}
				/>
			</label>


			{roundsLoading || driversLoading || constructorsLoading 
				? <SkeletonSelector /> 
				: ids && (
				<label className={ids.key}>
					<span>{ids.label}</span> 
					<Select
						onChange={option =>
							setFilter(prev => ({ ...prev, id: option }))
						}
						placeholder={filter.id ? filter.id.label : 'ALL'}
						value={filter.id ? filter.id.value : 'all'}
						options={ids.data}
						isSearchable={true}
					/>
				</label>
			)}
		</div>
	)
}

export default FilterPicker
