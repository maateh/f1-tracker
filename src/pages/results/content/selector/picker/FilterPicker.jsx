import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// compopnents
import SkeletonSelector from '../../../../../components/skeleton/SkeletonSelector'

// context
import { useResultsFilterContext } from '../context/hooks/useResultsFilterContext'

// model
import FilterOptionsModel from '../../../../../model/filter/FilterOptions'

const FilterPicker = () => {
	const params = useParams()
	const { pathname } = useLocation()
	
	const { years, standings, ids, loading, dispatch } = useResultsFilterContext()
	const [filter, setFilter] = useState({
		year: params.year ? years.get(params.year) : years.data[0],
		standings: standings.data.find(s => pathname.includes(s.value)) || standings.data[0]
	})
	
	const navigate = useNavigate()
	useEffect(() => {
		navigate(`./${filter.year.value}/${filter.standings.value}/${filter.id ? filter.id.value : 'all'}`, {
			replace: true
		})
	}, [navigate, filter])

	useEffect(() => {
		dispatch({ type: 'FETCH_ID_LIST_START' })
		FilterOptionsModel.fetchIds(filter.standings.value, filter.year.value)
			.then(data => {
				dispatch({ type: 'FETCH_ID_LIST_SUCCESS', payload: data })
				setFilter(prev => ({ ...prev, id: data.data[0] }))
			})
			.catch(err => dispatch({ type: 'FETCH_ID_LIST_ERROR', payload: err }))
	}, [filter.year, filter.standings, dispatch])
	

	return (
		<div className="filter-picker">
			<label className={years.key}>
				<span>{years.label}</span>
				<Select
					onChange={option => 
						setFilter(prev => ({ year: option, standings: prev.standings }))
					}
					placeholder={filter.year.label}
					value={filter.year.value}
					options={years.data}
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


			{loading && <SkeletonSelector />}
			{ids && (
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
