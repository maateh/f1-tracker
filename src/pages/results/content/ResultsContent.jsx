import { useQuery } from 'react-query'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import FilterSelector from './selector/FilterSelector'

// context
import { ResultsFilterContextProvider } from './selector/context/ResultsFilterContext'

// model
import Weekend from '../../../model/season/weekend/Weekend'

const ResultsContent = () => {
	const { year, id } = useParams()
	const navigate = useNavigate()

	useQuery({
		queryKey: ['lastRound'],
		queryFn: Weekend.queryLast,
		onSuccess: weekend =>
			navigate(`./${weekend.year}/rounds/all`, { replace: true }),
		enabled: !year && !id,
	})

	return (
		<div className="results-content">
			<ResultsFilterContextProvider>
				<FilterSelector />
			</ResultsFilterContextProvider>

			<Outlet />
		</div>
	)
}

export default ResultsContent
