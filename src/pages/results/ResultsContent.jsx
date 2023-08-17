import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import ResultsFilter from './components/filter/ResultsFilter'

// context
import { ResultsFilterContextProvider } from './components/filter/context/ResultsFilterContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'
import FilterOptionModel from '../../model/filter/FilterOption'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const ResultsContent = () => {
	const { year, id } = useParams()
	const navigate = useNavigate()

	const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year }) =>
			navigate(`./${year}/rounds/${FilterOptionModel.ALL.value}`, { replace: true }),
		enabled: !year && !id,
	})

	return (
		<div className="results-content">
			{isLoading && <CircularProgress />}

			{year && id && (
				<ResultsFilterContextProvider>
					<ResultsFilter />
				</ResultsFilterContextProvider>
			)}

			{isError && <p className="error__element">{error.message}</p>}

			<Outlet />
		</div>
	)
}

export default ResultsContent
