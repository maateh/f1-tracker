import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import PitsFilter from './filter/PitsFilter'

// context
import { PitsFilterContextProvider } from './filter/context/PitsFilterContext'

// models
import WeekendModel from "../../../../model/season/weekend/Weekend"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const PitsHistory = () => {
  const { year, round, type, id } = useParams()
  const navigate = useNavigate()

  const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year, round }) => {
      const route = `./${year}/${round}/${type || 'drivers'}/${id || 'all'}`
      navigate(route, { replace: true })
    },
		enabled: !year && !round,
	})

  return (
    <div className="history__container">
      {isLoading && <CircularProgress />}

      {year && round && (
        <PitsFilterContextProvider>
          <PitsFilter />
        </PitsFilterContextProvider>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </div>
  )
}

export default PitsHistory