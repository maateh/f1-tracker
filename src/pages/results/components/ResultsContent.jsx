import { useQuery } from 'react-query'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// components
import ResultsFilter from './filter/ResultsFilter'

// context
import { ResultsFilterContextProvider } from './filter/context/ResultsFilterContext'

// models
import WeekendModel from '../../../model/season/weekend/Weekend'
import FilterOptionModel from '../../../model/filter/FilterOption'

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
